const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.MONGOOSE_URI;

const connectDb = async () => {

    try {
        await mongoose.connect(URI);
        console.log("connected");

    } catch (error) {
        console.error("Database Connection Failed", error.message)
        process.exit(0);
    }

};

module.exports = connectDb;