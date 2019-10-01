const passport=require('passport')
const LocalStrategy = require('passport-local').Strategy
const users=require('./db').users
const google_users=require('./db').google_users
const GoogleStrategy=require('passport-google-oauth20')
const oauth=require('./oauth')

passport.serializeUser(function (user, done) {
    if(user.provider==='google')
    {done(null,user.id)}
    else
    {done(null, user.username)}
})

passport.deserializeUser(function (username, done) {
    users.findOne({
        where:{
            username:username
        } 
    })
    .then((user) => {
        if (!user) {
            google_users.findOne({
                where:{
                    id:username
                }
            })
            .then((user)=>{
                if(user)
                {done(null,user)}
                else
                {done(new Error("No such user"))}
            })

        }
        else
        {
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

passport.use(new GoogleStrategy({
    clientID:oauth.googleauth.clientId,
    clientSecret: oauth.googleauth.clientSecret,
    callbackURL: oauth.googleauth.cllbackURL,
    passReqToCallback   : true
  },
  function(req,accessToken,refreshToken,profile,done) {
    process.nextTick(()=>{
        //console.log(profile);
        google_users.findOne({
            where:{
                id:profile.id
            }
        })
        .then((user)=>{
            if(user){return done(null,user,req.flash('message',"Logged in with google"));}
            else{
                google_users.create({
                    id:profile.id,
                    token:accessToken,
                    name:profile.name.givenName,
                    value:0,
                    provider:'google'
                })
                .then((user)=>{return done(null,user,req.flash('message',"Signed up with google"));})
                .catch((err)=>{return done(err,req.flash('message',"Problem signing up"));})
            }
        })
        .catch((err)=>{return done(err,req.flash('message',"Problem logging in"))})
    })
  }
));

module.exports=passport;
