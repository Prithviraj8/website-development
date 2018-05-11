/*
var express    = require("express");
var app        = express();
var request    = require("request");
var mongoose   = require("mongoose");
var Campground = require("./models/campgrounds");
var seedDB     = require("./seeds");
var Comment    = require("./models/comment");
var flash      = require("connect-flash");
var passport   = require("passport");
var LocalStrategy = require("passport-local");
var User           = require("./models/user");
var methodOverride = require("method-override")

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require("./routes/index")


app.set("view engine","ejs");// This makes the server know to use the ejs file
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
//Public directory connected.(main.css)
//dirname is the that this script was running 
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));//Here method refers to  what method override needs.
//seedDB();
//Flash
app.use(flash());

//Passport configuration
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog",
    resave: false,
    saveUninitialized: false
    
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.connect("mongodb://localhost/yelp_camp_v6");

/*
Campground.create({
    
      name:"Garmont hill", 
      image:"https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fimg1.southernliving.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_inbody_900x506%2Fpublic%2Fimage%2F2017%2F09%2Fmain%2Fnewport_news_park_campsites.jpg%3Fitok%3DiLYKg20h&w=800&q=60" ,
      description:"AWESOME"
    
},
      function(err,campground){
       if(err){
           console.log(err);
       } else{
           console.log("NEWLY CREATED  CAMPGROUND");
           console.log(campground);
       }
    });
*/
/*
//Middleware- to pass req.user to every route without manually doing it for every single route.
//This middleware will work for every single route.
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   
   next();
});

app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);



//tell express tp listen for requests(Start server)
app.listen(process.env.PORT, process.env.IP,function () {
    console.log("Server has started");
    // body...
});
*/






var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campgrounds"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
 
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v10"; 
//mongoose.connect(url);
mongoose.connect("mongodb://Prithviraj:prithvi8@ds139919.mlab.com:39919/yelpcamp")
mongodb://Prithviraj:prithvi8@ds139919.mlab.com:39919/yelpcamp

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});