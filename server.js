const express = require("express");
const path = require("path");
const app = express();
const ejs = require("ejs");
const expresslayout = require("express-ejs-layouts");

const PORT = process.env.PORT || 3300;

// set assets 
app.use("/", express.static(path.join(__dirname, "/public")));


// set templating 
app.use(expresslayout);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));
 

app.get("/",(req,res) => {
    res.render("home");
})

app.get("/cart", (req,res) => {
    res.render("customers/cart");
})

app.get("/login", (req,res) => {
    res.render("auth/login");
})

app.get("/register", (req,res) => {
    res.render("auth/register");
})

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})