const app =require("./src/app");
const mongoose = require("./src/db/db");

mongoose();

app.listen(3000,()=>{
    console.log("Server is Started and connected on post 3000");
})