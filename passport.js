const passport=require('passport')
const LocalStrategy = require('passport-local').Strategy
const users=require('./db').users

passport.serializeUser(function (user, done) {
    console.log(user.username);
    done(null, user.username)
})

passport.deserializeUser(function (username, done) {
    console.log(username)
    users.findOne({
        where:{
            username:username
        } 
    })
    .then((user) => {
        //console.log("lets see")
        if (!user) {
            //console.log("whyyy")
            return done(new Error("No such user"))
        }
        else
        {
            //console.log(user);
            return done(null, user)
        }
    })
    .catch((err) => {
        done(err)
    })
})

passport.use('signup',new LocalStrategy({
    passReqToCallback:true
},
function(req,username,password,done)
{
    process.nextTick(function(){
        users.findOne({
            where:{
                username:username
            }    
        })
        .then((user)=>{
            if(!user)
            {
                users.create({
                    username:username,
                    password:password
                })
                .then((user)=>{return done(null,user,req.flash('message',"signed up successfully"))})
                .catch((err)=>{return done(err)})
            }    
            else
            {
                return done(null,false,req.flash('message',"username already exists"));
            }
        })
        .catch((err)=>{return done(err)})
    })
}));

passport.use('login',new LocalStrategy({
    passReqToCallback:true
},
function(req,username,password,done)
{
    users.findOne({
        where:{
            username:username,
        }
    })
    .then((user)=>{
        if(!user){return done(null,false,req.flash('message',"user does not exist"))}
        else
        {
            if(user.password!==password)
            {return done(null,false,req.flash('message',"incorrect password"))}
            else
            {return done(null,user,req.flash('message',"logged in successfully"))}
        }
    })
    .catch((err)=>{return done(err);})
}))

module.exports=passport;
