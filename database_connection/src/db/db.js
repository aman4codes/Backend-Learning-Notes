const mongoose = require("mongoose");

async function dbconnect() {
    try {
        await mongoose.connect("mongodb+srv://aman4codes_db_user:amankumar1@cluster0.vuymynw.mongodb.net/tables");

        console.log("Connected to DB");
    }
    catch {
        console.log("Err")
    }

}

module.exports = dbconnect;