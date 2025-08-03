const mongoose =require("mongoose");
const initdata=require("./data.js");
const listings=require("../models/listing.js")

main().then(()=>{console.log("connectedto dbs")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/furnitures');
}

const initdb=async () =>{
    await listings.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"6845e881c004a5fd599cb5c5"}))
    await listings.insertMany(initdata.data);
    console.log("data was initialized")
};

initdb();