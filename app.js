var express		  = require("express"),
	app			  = express(),
	bodyParser	  = require("body-parser"),
	mongoose	  = require("mongoose"),
	passport      = require("passport"),
	flash	      = require("connect-flash"),
	LocalStrategy = require("passport-local"),
	Campground    = require("./models/campground"),
	Comment		  = require("./models/comment"),
	User          = require("./models/user"),
	methodOverride= require("method-override"),
	seedDB		  = require("./seeds");

//required routes
var commentRoutes    = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes       = require("./routes/index");



// seedDB(); //seed database
mongoose.connect("mongodb+srv://gibrantorres:Amadeus1.@cluster0-1ryko.mongodb.net/test?retryWrites=true&w=majority",{
	useNewUrlParser: true,
	useCreateIndex: true
}).then(()=>{
	console.log("MongoDB running");
}).catch(err=>{
	console.log("error: ",err.message);
});

//packages needed
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"FIERRO PARIENTE",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//global variables?
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});


app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

const port = process.env.PORT || 3000;
//const ip = process.env.IP || "127.0.0.1";
    app.listen(port,function(){
        console.log("Server has started .... at port "+ port);
    });