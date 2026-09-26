const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");


const userController = require("../controllers/user.js");


// SignUp Page 
router.get("/signup" , userController.renderSignUpForm)

router.post("/signup" , wrapAsync(userController.signUp));


// Login Page 
router.get("/login" , userController.renderLogInForm);

router.post("/login" ,saveRedirectUrl, passport.authenticate("local" , {failureRedirect : "/login" , failureFlash : true}) , wrapAsync(userController.LogIn));


//  LogOut page 
router.get("/logout" , userController.LogOut);


module.exports = router;