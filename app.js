if(process.env.NODE_ENV !="production"){
  require("dotenv").config();
}
require("dotenv").config();
const express =require("express");
const app = express();
const mongoose = require("mongoose")
const listings=require("./models/listing.js")
const ObjectId = mongoose.Types.ObjectId;
const path = require("path");
const methodOverride=require("method-override")
const ejsmate=require("ejs-mate")
const ExpressError=require("./utils/ExpressError.js")
const review=require("./models/review.js")
const listing=require("./routes/listing.js")
const reviews=require("./routes/review.js")
const userroute=require("./routes/user.js")
const cookieParser=require("cookie-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash= require("connect-flash")
const passport=require("passport")
const LocalStrategy=require("passport-local")
const Users=require("./models/user.js")

app.listen(8000,()=>{
    console.log("server is listening");
})

const dburl=process.env.ATLASDB_URL;

main().then(()=>{console.log("connectedto dbs")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(dburl);
}
 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"public")))


const store = MongoStore.create({
  mongoUrl: dburl,
  crypto: {
    secret: 'mysecretkey'
  },
  touchAfter:24*3600
})

store.on("error",()=>{
  console.log("error in mongo session store",err)
})

const sessionOptions={
  store,
  secret: 'mysecretkey',
  resave:false,
  saveUninitialized:true,
  cookie:{
    expire:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
  }
}
app.use(session(sessionOptions))
app.use(flash())



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.use((req, res, next) => {
  res.locals.success= req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
});



// app.get("/demouser",async (req,res)=>{
//    let fakeuser=new Users({
//     email:"dinesh@gmail.com",
//     username:"dinesh"
//    })
//    let reguser= await Users.register(fakeuser,"1234")
//    res.send(reguser);
// })

app.get("/",async (req,res)=>{
  const allListings = await listings.find({});
  const allBrands = await listings.distinct("brand");  
res.render("listings/home.ejs", { alllistings: allListings ,brands:allBrands
});
})
app.get("/category/:cat",async (req,res)=>{
    let {cat} = req.params
    const alllistings= await listings.find({"category":cat});
    res.render("listings/index.ejs",{alllistings});
}) 
app.get("/brand/:brand",async (req,res)=>{
    let {brand} = req.params
    const alllistings= await listings.find({"brand":brand});
    res.render("listings/index.ejs",{alllistings});
}) 

app.use("/listings",listing);
app.use("/listings/:id/review",reviews);
app.use("/",userroute);



app.use((req, res, next) => {
   next(new ExpressError(404, "Page not found"));
});

app.use((err,req,res,next)=>{
   let {status=500, message="something went wrong"}=err;
   console.log(message);
   res.status(status).render("error.ejs",{message});
});


