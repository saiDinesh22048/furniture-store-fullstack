const listings=require("../models/listing.js")
const review=require("../models/review.js")


module.exports.createNewReview = async (req,res)=>{
   let {id} = req.params
   const listing= await listings.findById(id);
   const newreview= new review(req.body.review);
   newreview.author=req.user._id;
   listing.reviews.push(newreview);
   await newreview.save();
   await listing.save();
   
   req.flash("success","review added successfully");
   res.redirect(`/listings/${id}`);
}

module.exports.deleteReview = async (req,res)=>{
   let {id,rewid} = req.params;
   await listings.findByIdAndUpdate(id,{$pull:{reviews:rewid}});
   await review.findByIdAndDelete(rewid); 
   req.flash("success","review deleted successfully");
   res.redirect(`/listings/${id}`);
}