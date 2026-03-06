require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");


const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is started and running on port ${PORT}`);
})