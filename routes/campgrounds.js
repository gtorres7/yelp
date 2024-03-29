var express= require("express");
var router =express.Router();
var Campground = require("../models/campground");
var middleware=require("../middleware/index.js");

//INDEX - show all campgrounds
router.get("/",function(req,res){
	//GET CAMPGROUNDS FROM DB
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});
		}
	});
});

//CREATE -- add new campground to db
router.post("/", middleware.isLoggedIn ,function(req,res){
	//GET DATA FROM A FORM AND ADD TO CAMPGROUNDS ARRAY
	var name=req.body.name;
	var image=req.body.image;
	var price=req.body.price;
	var description=req.body.description;
	var author={
		id: req.user._id,
		username: req.user.username
	};
	var newCampground={price:price, name:name,image:image, description:description, author:author};
	//create new campground and save to db
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
	//REDIRECT TO CAMPGROUNDS ROUTE
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
	
	
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn ,function(req, res){
   res.render("campgrounds/new"); 
});

//SHOW
router.get("/:id",function(req,res){
	//FIND CAMPGROUND WITH PROVIDED ID
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);		
		}else{
			console.log(foundCampground);
			//render show template with that campground
		res.render("campgrounds/show",{campground:foundCampground});
		}
	});
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		res.render("campgrounds/edit",{campground:foundCampground});		
	});
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
	//redirect to somewhere(show page)
});
//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});






module.exports=router;