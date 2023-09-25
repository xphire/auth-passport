require('dotenv').config();

const express = require('express');

const app = express();

const connect = require('./database/connect');

const session = require('express-session');


const router = require('./routers/router');

const { v4 : uuidv4 } = require('uuid');

const MongoStore = require('connect-mongo');

const passport = require('passport');


require('./config/passport');


app.use(express.urlencoded({extended : true}));

app.use(express.json());

const port = process.env.PORT || 9999;


app.use(session({
    secret : 'abc1452782920272526728', //this should be stored in the env file
    resave : false,
    cookie : {
        httpOnly: true,
        maxAge : 180000,


    },
    genid : function(){
        return uuidv4();
    },
    name : "_cflamba",
    saveUninitialized : true,
    store : MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName : 'sessions',
        autoRemove : 'disabled'
    })
}));


passport.serializeUser((user , done) => {
    done(null, user._id);
});


passport.deserializeUser((user, done) => {
    done(null, user);
});


app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {

    req.msg = "You are here";

    res.send(`live and kicking bro ${req.msg}`);
});


app.post('/login',passport.authenticate('local',{failureRedirect : '/unauthenticated',successRedirect: '/protected'}));


app.use(router);

app.listen(port, async () => {
     
    try {
        await connect(process.env.MONGO_URI);
        console.log(`listening on ${port}`);
    } catch (error) {
        console.error(error);
    }
   
});


