const express = require("express");
const path = require("path");
const app = express();
const ejs = require("ejs");
const expresslayout = require("express-ejs-layouts");

const PORT = process.env.PORT || 3300;

// set templating 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));
 
// set assets 
app.use("/", express.static(path.join(__dirname, "/public")));

app.get("/",(req,res) => {
    res.render("home");
})

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})