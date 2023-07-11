const express = require('express');
const app = express();
const port = 10;





//const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');  // connect db
const User = require('./models/user');  //connect schema



//for reading and writing the cookie i use cooki parser. basically mean that, 
// if one user come your website and try to change your url link . like one come and try directly access in home page 
//so, he does not log in or sign up user , and type localhost:8000/home 
//in hear i set up step sign up ---> login ---> home 
// so prevent them use cookieParser
const cookieParser = require('cookie-parser');




// set up the view engine 
app.set('view engine', 'ejs');
app.set('views', './views');
 

//add meaddelwear
app.use(express.urlencoded()); // use it to find data from the page like name , email etc are find and push it
 //now i tell the app use it 
app.use(cookieParser());


 



app.get('/', async (req, res) => {
  try {
    if (req.cookies.user_id) {
      const userID = await User.findById(req.cookies.user_id);
      if (userID) {
        return res.render('profile.ejs',{
        user : userID // by useing this i access database data in ./views/profile/line 12 -15
        });
      }
      return res.redirect('/login');
    } else {
      return res.redirect('/login');
    }
  } catch (err) {
    console.log(err);
  }
});





app.get('/signup', (req, res) => {  // hear any body  hit /signup  then go 
  res.render('signup.ejs');  // this page 
});
app.get('/login', (req, res) => {
  res.render('login.ejs');
});









//sign up logaic
app.post('/create', async (req, res) => {


  if (req.body.password !== req.body.confirmPassword) {
    console.log("Password does not match with your Confirm Password");
    return res.redirect('back');

  }

  try {
    const data = await User.findOne({ email: req.body.email });
    if (!data) {
      await User.create(req.body);
      return res.redirect('/login');
    }
  } catch (err) {
    console.log(err);
  }
});





//login logic
app.post('/allow-user', async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });  // find unic id which given in mongose
    if (data) {
      if (data.password != req.body.password) {  // it check your browser cookie == mongo cookie
        console.log("UserName or Password Incorrect!");
        res.redirect('back');
      }

      res.cookie('user_id', data.id);
      return res.redirect('/');
    } else {
      console.log("User with this Email Does not exists");
      return res.redirect('/signup');
    }
  } catch (err) {
    console.log(err);
  }
});







//log out logaic 
app.post('/sign-out', (req, res) => {
  if (req.cookies.user_id) {   // if you have cookie 
    res.clearCookie('user_id')  // so, clear it by useing---> clearCookie 
    return res.redirect('./login')
  }
})








app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
