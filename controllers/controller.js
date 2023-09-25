const User = require('../model/users');

const hash = require('../utilities/genPass');

const registerUser = async (req,res) => {



    try {

      //check the incoming payload 

      if(!req.body || !req.body.email || !req.body.password){
         
        return res.status(400).send("missing email or password");
      }

      //checking case sensitivity for example abc@gmail.com vs ABC@gmail.com

      const compass = {
        userName: {
          $regex: req.body.email,
          $options: 'i' // 'i' for case-insensitive, remove it for case-sensitive
        }
      };

      const exist = await User.find(compass).exec();

      if(exist.length >= 1){
        return res.status(400).send("user already exists in DB");
      }
      
      const payload = {
        
        "userName" : req.body.email,
        "hash" : await hash(req.body.password),

      };


     //save user to DB


     await User.create(payload);


     return res.status(200).send("user successfully created");
        
    } catch (error) {
        console.log(error);
        return res.status(500).send("user creation failed");
    }


};



const loginPage = (req,res) => {
     
  res.status(200).send(
      `
  <h3 style="background-color:black;color:white;text-align:center;padding-top:10px;padding-bottom:10px;margin-left:0px;margin-right:0px;margin-bottom:50px;">Login</h3>
  <form action="/login" method="POST" style="display:flex;    justify-content:center;align-items:center;flex-direction:column" >
      <label for="email">Email Address:</label>
      <input type="input" id="email" name="username" placeholder="enter email address here" style="height:30px;width:300px;margin-bottom:30px;">
      <label for="password">Password:</label>
      <input type="input" id="password" name="password" placeholder="enter password here" style="width:300px;height:30px;margin-bottom:50px">
      <button type="submit" style="padding:10px">Log in</button>
  </form>
  `
  )
};


const logOut = (req,res) => {
   req.logout((err) => {
    if(err){
      console.log(err);
      return res.send(`logout failed`);
    };

    return res.redirect('/unauthenticated');
   });  
};


const failure = (req,res) => {
  res.status(401).send(
      `<h2>You are not authenticated, kindly log in</h2>
      <a href="/login">Login</a>`
  )
};


const registerPage = (req,res) => {

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


const protected = (req,res) => {

  res.status(200).send(
    `<p>You are welcome to the protected route, you are able to access here because you are logged in. You can logout below</p>
    <a href="/logout">Logout</a>`
  )
};


module.exports = {registerUser,loginPage,logOut,failure,registerPage,protected};