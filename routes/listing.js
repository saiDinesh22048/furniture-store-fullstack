const express =require("express");
const router= express.Router();
const listings=require("../models/listing.js")
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const {listingSchema }=require("../schema.js")
const {reviewSchema }=require("../schema.js")
const review=require("../models/review.js")
const flash= require("connect-flash")
const passport=require("passport")
const LocalStrategy=require("passport-local")
const {isloggedin}= require("../middleware.js")
const {isowner}= require("../middleware.js")
const user=require("../models/user.js")
const ListingController = require('../controller/listing.js');
const {storage}=require("../cloudconfig.js");
const multer = require('multer');
const upload= multer({ storage});


const validatelisting=(req,res,next)=>{
   let {error}=listingSchema.validate(req.body);
   if(error){
      throw new ExpressError(400,error)
   }
   else{
      next()
   }
}

//home and create listing route 
router
   .route("/")
   .get(wrapAsync(ListingController.homeRoute))
   .post(isloggedin,validatelisting,upload.single('listing[image]'),wrapAsync(ListingController.createNewListing));
   

//new index
router.get("/new",isloggedin,ListingController.newListingForm);

//show, update,delete  list route  
router
   .route("/:id")
   .get(wrapAsync(ListingController.showListing))
   .put(isloggedin,isowner,validatelisting,upload.single('listing[image]'),wrapAsync(ListingController.updateListing))
   .delete(isloggedin,isowner,wrapAsync(ListingController.destroyListing))

//edit form route
router.get("/:id/edit",isloggedin,isowner,wrapAsync(ListingController.editListing))

module.exports= router