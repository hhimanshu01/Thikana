const User = require("../models/user.js");

module.exports.renderSignUpForm = (req , res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req , res) => {
    try
    {
        let {username,email,password} = req.body;
        let newUser = new User({
            email : email,
            username : username
        });

        let registeredUser = await User.register(newUser , password);
        req.login(registeredUser , (err) => {
            if(err)
            {
                return next(err);
            }
            req.flash("success" , "Welcome to Thikana !!");
            res.redirect("/listings");
        })
    }
    catch(err)
    {
        req.flash("error" , err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLogInForm = (req , res) => {
    res.render("users/login.ejs");
};

module.exports.LogIn = async (req,res) => {
    req.flash("success" , "Welcome back to Thikana !!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    if(redirectUrl)
    {
        res.redirect(redirectUrl);
    };
};

module.exports.LogOut = (req,res,next) => {
    req.logOut((err) => {
        if(err)
        {
            return next(err);
        }
        req.flash("success" , "Logged out successfully !!");
        res.redirect("/listings");
    })
};