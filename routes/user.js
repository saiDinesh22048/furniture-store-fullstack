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
  .route("/signup/partner")
  .get(wrapAsync(userController.signupPartnerForm))
  .post(wrapAsync(userController.signUpPartner));

router
  .route("/login/partner")
  .get(wrapAsync(userController.loginPartnerForm))
  .post(
    saveRedirectUrl,
    passport.authenticate("brand-local", {
      failureRedirect: "/login/partner",
      failureFlash: true,
    }),
    userController.loginPartner
  );

router.get("/logout",userController.logout);


module.exports= router