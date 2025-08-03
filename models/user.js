const { required } = require("joi");
const mongoose =require("mongoose");
const schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const userschema=new schema({
  "email": {
    type:String,
    required:true
  },
})



userschema.plugin(passportLocalMongoose)

const users=mongoose.model("users",userschema);
module.exports=users; 