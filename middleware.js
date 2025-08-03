const listings=require("./models/listing.js")
const review=require("./models/review.js")

module.exports.isloggedin=(req,res,next)=>{

    if(!req.isAuthenticated()){
       req.session.redirecturl=req.originalUrl;
       req.flash("error","you must be logged in to create add new furniture");
       return res.redirect("/login")
   }
   next()
}

module.exports.saveredirecturl=(req,res,next)=>{

    if(req.session.redirecturl){
       res.locals.redirecturl=req.session.redirecturl;
   }
   next()
}

module.exports.isowner=async (req,res,next)=>{

    let {id} = req.params
   let list=await listings.findById(id);
   if(!list.owner._id.equals(res.locals.currUser._id)){
      req.flash("error","you dont have permission to edit");
      return res.redirect(`/listings`);
   }
   next()
}


module.exports.isauthor=async (req,res,next)=>{

   let {id,rewid} = req.params;
   let rev=await review.findById(rewid);
   if(!rev.author._id.equals(res.locals.currUser._id)){
      req.flash("error","you dont have permission to delete");
      return res.redirect(`/listings/${id}`);
   }
   next()
}