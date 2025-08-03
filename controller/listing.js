const listings=require("../models/listing.js")
const mbxgeocodong = require('@mapbox/mapbox-sdk/services/geocoding');



module.exports.homeRoute = async (req,res)=>{
   const alllistings= await listings.find({});
   res.render("listings/index.ejs",{alllistings});
}; 

module.exports.newListingForm =(req,res)=>{
   res.render("listings/new.ejs");
};

module.exports.createNewListing = async (req,res)=>{
   let url=req.file.path;
   let filename=req.file.filename;
   const place = req.body.listing.location;
   try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${place}&format=json&limit=1`);
    const data = await response.json();
    if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
     }
   let newlisting= new listings(req.body.listing);
   newlisting.image={url,filename}
   newlisting.coordinates=[data[0].lat,data[0].lon];
   newlisting.owner=req.user._id;
   await newlisting.save();
   req.flash("success","new listing added successfully");
   res.redirect("/listings");
   } catch (err) {
    req.flash("error",err);
   }

   

};

module.exports.editListing = async (req,res)=>{
   let {id} = req.params
   const listing= await listings.findById(id);
   if(!listing){
      req.flash("error","this listing does not exist")
      res.redirect("/listings")
   }
   let originalimgurl=listing.image.url;
    originalimgurl=originalimgurl.replace("/upload","/upload/w_250");
   res.render("listings/edit.ejs",{listing,originalimgurl});
};

module.exports.updateListing =async (req,res)=>{
   let {id} = req.params
   const place = req.body.listing.location;
   try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${place}&format=json&limit=1`);
    const data = await response.json();
    if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
     }
   console.log(data)
   let updlist=await listings.findByIdAndUpdate(id,{...req.body.listing});
   updlist.coordinates=[data[0].lat,data[0].lon];
   await updlist.save();
   if(typeof req.file !=="undefined"){
       let url=req.file.path;
       let filename=req.file.filename;
       updlist.image={url,filename}
       await updlist.save();
   }
   } catch (err) {
    req.flash("error",err);
   }
   req.flash("success","listing updated successfully");
   res.redirect(`/listings/${id}`);
};

module.exports.destroyListing =async (req,res)=>{
   let {id} = req.params;
   await listings.findByIdAndDelete(id);
   req.flash("success","listing deleted successfully");
   res.redirect(`/listings`);
};

module.exports.showListing = async (req,res)=>{
   let {id} = req.params;
   const listing= await listings.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
   res.render("listings/show.ejs",{listing});
};