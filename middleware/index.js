var Campground =require("../models/campground");
var Comment =require("../models/comment");

//all the middleware goes here
var middlewareObject={};


//user ownership function
middlewareObject.checkCampgroundOwnership=function(req,res,next){
	//is user logged in?
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err){
				req.flash("error","Campground not found");
				res.redirect("back");
			}else{
				//does user own  the campground?
				if(foundCampground.author.id.equals(req.user._id)){
					next();		
				}else{
					req.flash("error","You don't have permission to do that");
					res.redirect("back");
				}
			} 
		});
	}else{
		req.flash("error","You need to be logged in to do that");
		res.redirect("back");
	}
};

//Comment ownership function
middlewareObject.checkCommentOwnership=function(req,res,next){
	//is user logged in?
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				res.redirect("back");
			}else{
				//does user own  the comment?
				if(foundComment.author.id.equals(req.user._id)){
					next();		
				}else{
					req.flash("error","You dont have permission to do that");
					res.redirect("back");
				}
			} 
		});
	}else{
		req.flash("error","You need to be logged in to do that");
		res.redirect("back");
	}
};

//Check logged user function
middlewareObject.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be logged in to do that");
	res.redirect("/login");
};


module.exports=middlewareObject;