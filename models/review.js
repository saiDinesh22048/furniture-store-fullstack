const mongoose =require("mongoose");
const schema=mongoose.Schema;
const users=require("./user.js");

const reviewschema=new schema({
  "comment": {
    type:String
  },
  "rating": {
    type:Number,
    min:1,
    max:5
  },
  "createdat": {
    type:Date,
    default:Date.now()
  },
  "author":{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  }
})

const review=mongoose.model("review",reviewschema);
module.exports=review;