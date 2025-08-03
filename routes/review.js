const express =require("express");
const router= express.Router({mergeParams:true});
const listings=require("../models/listing.js")
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const {listingSchema }=require("../schema.js")
const {reviewSchema }=require("../schema.js")
const review=require("../models/review.js")
const {isloggedin}= require("../middleware.js")
const {isauthor}= require("../middleware.js")
const reviewController = require('../controller/review.js');

const validatereview=(req,res,next)=>{
   let {error}=reviewSchema.validate(req.body);
   if(error){
      throw new ExpressError(400,error)
   }
   else{
      next()
   }
}

//add review
router.post("/",isloggedin,validatereview,wrapAsync(reviewController.createNewReview))

router.delete("/:rewid",isloggedin,isauthor,wrapAsync(reviewController.deleteReview))

module.exports= router