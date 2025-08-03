const express =require("express");
const router= express.Router({mergeParams:true});
const listings=require("../models/listing.js")
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const passport=require("passport")
const LocalStrategy=require("passport-local")
const {saveredirecturl}= require("../middleware.js")
const userController = require('../controller/user.js');

const Users=require("../models/user.js")
const flash= require("connect-flash")

router
   .route("/signup")
   .get(wrapAsync(userController.signupForm ))
   .post(wrapAsync(userController.signUp))

router
   .route("/login")
   .get(wrapAsync(userController.loginForm))
   .post(saveredirecturl,
   passport.authenticate("local", { failureRedirect: "/login",failureFlash:true }),userController.login)

router
   .route("/login2")
   .get(wrapAsync(userController.loginForm2))
   .post(saveredirecturl,
   passport.authenticate("local", { failureRedirect: "/login2",failureFlash:true }),userController.login2)

router.get("/logout",userController.logout);


module.exports= router
