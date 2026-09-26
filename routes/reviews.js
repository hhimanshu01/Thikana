const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");

let {validateReview} = require("../middleware.js")
let {isLoggedIn} = require("../middleware.js")
let {isReviewAuthor} = require("../middleware.js")

const reviewController = require("../controllers/reviews.js");



// ADD REVIEW 
router.post("/" ,isLoggedIn ,validateReview, wrapAsync(reviewController.createReview));

// DELETE REVIEW
router.delete("/:reviewId" ,isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));


module.exports = router;
