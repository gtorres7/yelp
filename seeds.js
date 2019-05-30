var	mongoose	=	require("mongoose"),
	Comment		=	require("./models/comment"),
	Campground	=	require("./models/campground");
	

var data=[
	
	{name:"Ugly Boat #1",
	image:"https://images.pexels.com/photos/2285473/pexels-photo-2285473.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	description:"Turkey jerky salami pork belly fatback alcatra kevin frankfurter. Prosciutto tongue hamburger cupim, buffalo cow kevin tenderloin corned beef beef ball tip shoulder pork. 				Burgdoggen ball tip buffalo tongue, pancetta frankfurter beef pig. Ham hock strip steak boudin, biltong corned beef kielbasa capicola shankle shank turkey pork chop jowl. 					Meatball tail t-bone tenderloin jowl, kielbasa kevin doner ribeye burgdoggen. Strip steak chuck frankfurter sirloin tri-tip buffalo ham hock, ham doner pork loin pork."},
	
	{name:"Cardboard Home #2",
	image:"https://images.pexels.com/photos/2280606/pexels-photo-2280606.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	description:"Pig drumstick leberkas cow ribeye rump turkey venison swine short loin chicken sausage cupim ham hock. Bresaola short loin tongue shankle picanha doner strip steak tri-tip 				brisket venison frankfurter chuck. Tri-tip ham hock porchetta pork chop, tongue tail tenderloin chicken biltong. Alcatra spare ribs tail brisket."},
	
	{name:"Royal Palace #3",
	image:"https://images.pexels.com/photos/2267872/pexels-photo-2267872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	description:"Spicy jalapeno bacon ipsum dolor amet meatball t-bone ground round pig capicola. Rump chicken brisket ham shankle short loin hamburger tri-tip landjaeger ground round 					frankfurter filet mignon spare ribs. Tail biltong bacon kielbasa swine chuck landjaeger. Tenderloin tongue boudin turducken, meatloaf leberkas flank strip steak beef ribs ball 				tip sirloin. Short ribs flank cupim kevin frankfurter."}
];

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        // console.log("removed campgrounds!");
        //  //add a few campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err);
        //         } else {
        //             console.log("added a campground");
        //             //create a comment
        //             Comment.create(
        //                 {
        //                     text: "This place is great, but I wish there was internet",
        //                     author: "Homer"
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Created new comment");
        //                     }
        //                 });
        //         }
        //     });
        // });
    }); 
    //add a few comments
}

module.exports=seedDB;