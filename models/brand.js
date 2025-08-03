const { required } = require("joi");
const mongoose =require("mongoose");
const schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");


const brandschema=new schema({
  "email": {
    type:String,
    required:true
  },
})


brandschema.plugin(passportLocalMongoose)
const brands=mongoose.model("brands",brandschema);

module.exports=brands; 