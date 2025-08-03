const mongoose =require("mongoose");
const schema=mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const review=require("./review.js");
const users=require("./user.js");
const brands=require("./user.js");
const listingschema=new schema({
  "name": {
    type:String
  },
  "description": String,
  "price": Number,
  "discount": Number,                
  "brand": String,
  "stock_quantity": Number,
  "image":{
    "url":String,
    "filename":String
  } ,
  "category": String,
  "sub_cat":String,
  "reviews":[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"review"
    }
  ],
  "owner":{
      type:mongoose.Schema.Types.ObjectId,
      ref:"brands"
  },
  "location":String,
  
  "coordinates": {
      type: [Number],
      required: true
    }
  

})

listingschema.post("findOneAndDelete", async (listing) =>{
  if(listing){
   await review.deleteMany({_id:{$in:listing.reviews}})
}
})

const listings=mongoose.model("listings",listingschema);
module.exports=listings;