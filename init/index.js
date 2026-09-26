const mongoose = require("mongoose");
let data = require("./data.js");
const Listing  = require("../models/listing.js");

async function main()
{
    await mongoose.connect("mongodb://127.0.0.1:27017/thikana");
}

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

const initDB = async () => {
    await Listing.deleteMany({});
    data = data.map((obj) => (
        {...obj , owner : "6ab3b0d6daf6b169c3d990d5" })
    );
    await Listing.insertMany(data);
    console.log("Data Initialized");
}

initDB();