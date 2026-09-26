const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const {isLoggedIn} = require("../middleware.js");
const {isOwner} = require("../middleware.js");
const {validateListing} = require("../middleware.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listing.js");


// Index Route 
router.get("/" ,  wrapAsync(listingController.index));

// Add new listing - page showing 
router.get("/new" , isLoggedIn, listingController.renderNewForm );


// Add new listing - storing in DB 
router.post("/" , isLoggedIn ,upload.single('listing[url]'),validateListing, wrapAsync(listingController.createListing));


// Show Particular Route 
router.get("/:id" , wrapAsync(listingController.showListing));


// Edit route - page showing
router.get("/:id/edit" ,isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

// Edit route - storing in DB
router.put("/:id" ,isLoggedIn, isOwner,upload.single('listing[url]'), validateListing, wrapAsync(listingController.updateListing));


// Delete any Listing
router.delete("/:id" ,isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));


module.exports = router;