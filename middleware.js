const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {reviewSchema , listingSchema} = require("./schema.js");
const Review = require("./models/review.js");


let validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error)
    {
        throw new ExpressError(400 , error);
    }
    else
    {
        next();
    }  
};

let validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error)
    {
        throw new ExpressError(400 , error);
    }
    else
    {
        next();
    }
};

let isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated())
    {
        //info store
        req.session.redirectUrl = req.originalUrl;
        console.log(req.user);
        req.flash("error" , "You must be logged in !!");
        return res.redirect("/login");
    }
    next();
};

let saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

let isOwner = async(req,res,next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id))
    {
        req.flash("error" , "You don't have permission !!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

let isReviewAuthor = async(req,res,next) => {
    let {id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id))
    {
        req.flash("error" , "You didn't created this review !!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports = {isLoggedIn , saveRedirectUrl , isOwner , validateListing , validateReview , isReviewAuthor} ;