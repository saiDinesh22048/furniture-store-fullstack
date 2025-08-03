const users=require("../models/user.js");
const Brands=require("../models/brand.js");
module.exports.signupForm =async (req,res)=>{
   res.render("users/signup.ejs");
}


module.exports.signUp = async (req,res)=>{
  try {let {username,email,password}=req.body;
   let newuser= new ({email,username});
   const reguser=await user.register(newuser,password);
   let redirecturl= res.locals.redirecturl || "/listings"
   req.login(reguser,(err)=>{
      if(err){
         return next(err);
      }
   req.flash("success","registered successfully")
   res.redirect(redirecturl);
   })
//    try {let {username,email,password}=req.body;
//    let newuser= new Brands({email,username});
//    const reguser=await Brands.register(newuser,password);
//    let redirecturl= res.locals.redirecturl || "/listings"
//    req.login(reguser,(err)=>{
//       if(err){
//          return next(err);
//       }
//    req.flash("success","registered successfully")
//    res.redirect(redirecturl);
//    })
   
}catch(e){
    req.flash("error",e.message);
    let redirecturl= res.locals.redirecturl || "/"
    res.redirect(redirecturl);
   }
};

module.exports.loginForm = async (req,res)=>{
   res.render("users/login.ejs");
};

module.exports.loginForm2 = async (req,res)=>{
   res.render("users/login2.ejs");
};

module.exports.login =async (req,res)=>{
  req.flash("success","welcome to our store");
  let redirecturl= res.locals.redirecturl || "/listings"
  res.redirect(redirecturl);
   
};

module.exports.login2 =async (req,res)=>{
  req.flash("success","welcome to our store");
  let redirecturl= res.locals.redirecturl || "/listings"
  res.redirect(redirecturl);
   
};

module.exports.logout =  (req,res,next)=>{
    req.logout((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success","you are logged out successfully");
        res.redirect("/listings");
        });
    

}
