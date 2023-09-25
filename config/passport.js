const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/users');

const validatePass = require('../utilities/validatePass');


const verifyCallback = async (username, password , done) => {

     try {

        const user = await User.findOne({userName : username});

        if(!user){ return done(null, false)};

        const isValid = await validatePass(password,user.hash);

        if (isValid)
        { 
            return done(null, user);
        }
        else
        {
           return done(null,false);
        }

        
     } catch (error) {
        console.log(error);
        return (null,false);
     }
    
      

};


const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);


passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});