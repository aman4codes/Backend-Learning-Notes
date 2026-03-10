require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");
const adminRoutes = require("./routes/admin-routes");

const app = express();
const PORT = process.env.PORT || 3000;

//MiddleWare
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);


connectDB();

app.listen(PORT, () => {
    console.log(`Server is started and running on port ${PORT}`);
});

