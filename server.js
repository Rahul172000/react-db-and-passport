const express=require('express')
const app=express();
const cors=require('cors')
const users=require('./db').users
const google_users=require('./db').google_users
const session=require('express-session')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const passport=require('./passport')

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));//////////////very important

app.use(cookieParser('keyboard cat'));

app.use(session({ secret:'somesecretstring',cookie: { maxage:6000,secure:false }}));
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())


app.get('/create',(req,res)=>{
    req.flash('test','working....ayayayay')
    res.send("heyyy")
})
app.get('/show',(req,res)=>{
    console.log(req.flash('test'))
    res.send(req.flash('test')[0])
})

app.get('/check',(req,res)=>{
    if(req.user!==undefined)
    {res.send({user:req.user})}
    else
    {res.send({user:true})}
})
app.post('/signup',passport.authenticate('signup',{
    successRedirect:'/private',
    failureRedirect:'/fail',
    failureFlash:true
}))
app.post('/login',passport.authenticate('login',{
    successRedirect:'/private',
    failureRedirect:'/fail',
    failureFlash:true
}))
app.get('/logout',(req,res)=>{
    req.logOut();
    res.send("DONE")
})
app.post('/save',(req,res)=>{
    if(req.user.provider!=='google')
    {
        users.destroy({
            where:{
                username:req.user.username
            }
        })
        .then((result)=>{
            users.create({
                username:req.user.username,
                password:req.user.password,
                value:req.body.value
            })
            .then((account)=>{res.send('DONE')})
            .catch((err)=>{throw err})
        })
        .catch((err)=>{throw err})
    }
    else
    {
        google_users.destroy({
            where:{
                id:req.user.id
            }
        })
        .then((result)=>{
            google_users.create({
                id:req.user.id,
                token:req.user.token,
                name:req.user.name,
                value:req.body.value,
                provider:req.user.provider
            })
            .then((account)=>{res.send('done')})
            .catch((err)=>{throw err})
        })
        .catch((err)=>{throw err})
    }    
})
app.get('/private',(req,res)=>{
    //console.log(req.flash('message'))
    //console.log(req.user)
    //res.send(req.user)
    res.send({user:req.user,message:req.flash('message')[0]})
})
app.get('/fail',(req,res)=>{
    console.log('fail');
    //console.log(req.flash('message'))
    res.send({user:null,message:req.flash('message')[0]})
})
app.get('/googleprivate',(req,res)=>{
    res.redirect('http://localhost:3000/profile');//redirect to profile page which will check via check path if any user is logged in or not
})
app.get('/auth/google',passport.authenticate('google', {scope:['profile']}))
app.get('/auth/google/callback',passport.authenticate('google', { successRedirect:'/googleprivate',failureRedirect: '/fail',failureFlash:true }));
app.listen(2000,()=>{console.log("SERVER STARTED")})