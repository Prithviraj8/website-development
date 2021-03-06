 var express = require("express");
 var router = express.Router();
 var passport = require("passport");
  var User = require("../models/user");





router.get("/",function (req,res) {
    res.render("landing");
    // body...
});


   
//======
//AUTH ROUTES

/*//Show Register form
router.get("/register",function(req, res) {
   res.render("register"); 
});
*/
// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//handle sign up logic
router.post("/register",function(req, res) {
  var newUser = new User({username:req.body.username}); 
   User.register(newUser, req.body.password, function(err, user){
       if(err){
         req.flash("error", err.message);

           return res.render("register");
       }
       passport.authenticate("local")(req,res,function(){
         req.flash("success","Welcome to YelpCamp "+ user.username);

           res.redirect("/campgrounds");
       });
   });
});

/*//Show login form
router.get("/login",function(req, res) {
 res.render("login");    
});
*/
//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});
//Handling login logic using middleware
router.post("/login",passport.authenticate("local",
     {
         /*If user successfully logs in it takes them to the campgrounds page else 
         it takes them to the login page.
         */
         successRedirect: "/campgrounds",
         failureRedirect: "/login"
      }),function(req, res) {
    
});

//Logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success","Logged you out");
    res.redirect("/campgrounds");
});



        module.exports = router;