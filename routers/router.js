const express = require('express');

const router = express.Router();


//authentication middleware start

const is_auth = (req,res,next) => {

    
    if (req.isAuthenticated())
    {
        if (req.path === "/login" || req.path === "/register")
        {
            return res.redirect('/protected')
        }
        else
        {
            return  next();
        };
    }
    else
    {
        if (req.path === "/login" || req.path === "/register")
        {
            if(req.path === "/login")
            {
                return  res.send(` <h3 style="background-color:black;color:white;text-align:center;padding-top:10px;padding-bottom:10px;margin-left:0px;margin-right:0px;margin-bottom:50px;">Login</h3>
                <form action="/login" method="POST" style="display:flex;    justify-content:center;align-items:center;flex-direction:column" >
                    <label for="email">Email Address:</label>
                    <input type="input" id="email" name="username" placeholder="enter email address here" style="height:30px;width:300px;margin-bottom:30px;">
                    <label for="password">Password:</label>
                    <input type="input" id="password" name="password" placeholder="enter password here" style="width:300px;height:30px;margin-bottom:50px">
                    <button type="submit" style="padding:10px">Log in</button>
                </form>
                `);
            }
            else
            {
                res.status(200).send(`
                <h3 style="background-color:black;color:white;text-align:center;padding-top:10px;padding-bottom:10px;margin-left:0px;margin-right:0px;margin-bottom:50px;">Register New User</h3>
                <form action="/register" method="POST" style="display:flex;    justfify-content:center;align-items:center;flex-direction:column" >
                    <label for="email">Email Address:</label>
                    <input type="input" id="email" name="email" placeholder="enter email address here" style="height:30px;width:300px;margin-bottom:30px;">
                    <label for="password">Password:</label>
                    <input type="input" id="password" name="password" placeholder="enter password here" style="width:300px;height:30px;margin-bottom:50px">
                    <button type="submit" style="padding:10px">Create User</button>
                </form>
                `)
            };
        }
        else
        {
            return  res.send(` <h3 style="background-color:black;color:white;text-align:center;padding-top:10px;padding-bottom:10px;margin-left:0px;margin-right:0px;margin-bottom:50px;">Login</h3>
            <form action="/login" method="POST" style="display:flex;    justify-content:center;align-items:center;flex-direction:column" >
                <label for="email">Email Address:</label>
                <input type="input" id="email" name="username" placeholder="enter email address here" style="height:30px;width:300px;margin-bottom:30px;">
                <label for="password">Password:</label>
                <input type="input" id="password" name="password" placeholder="enter password here" style="width:300px;height:30px;margin-bottom:50px">
                <button type="submit" style="padding:10px">Log in</button>
            </form>
            `);
        };
       
    }
};


//////////auth middleware ended/////////////////////////////////////////////////////////////////////////////

const {registerUser,loginPage,logOut,failure,registerPage,protected} = require('../controllers/controller');

router.route('/register').post(registerUser).get(is_auth,registerPage);


router.route('/login').get(is_auth,loginPage);


router.route('/unauthenticated').get(failure);


router.route('/protected').get(is_auth,protected);


router.route('/logout').get(logOut);


module.exports = router;