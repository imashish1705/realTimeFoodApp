// starting mein hum letter tabi capital rakhte hai jab hume usko as a class or constructor ki tarh use krna ho
require("dotenv").config() // evn file
const express = require("express");
const path = require("path");
const app = express(); //app
const ejs = require("ejs"); // ejs
const expresslayout = require("express-ejs-layouts");// layout 

var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require("express-session");
const flash = require("express-flash"); //for cookie
const MongoDbStore = require("connect-mongo")(session);

// session store




const PORT = process.env.PORT || 3300;


// database connection
mongoose.connect('mongodb://localhost:27017/pizza', { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true, useFindAndModify:true});
const connection = mongoose.connection;
connection.once("open",() => {
    console.log("Connected to Pizza DB");
})
.catch(err => {
    console.log("E-error...");
    
});


//session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: "sessions"
    
});


// session config  ...session ko kaam krne k liye cookie chaiye hoti hai
// express ka koi bhi middleware use krana hai toh
app.use(session({
    // secret ko ek .evn mei rkhna hota hai toh iske liye dotenv intall krna hai
    secret: process.env.COOKIE_SECRET,
    resave:false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 100*60*60*24} // 24hrs cookie ki life hai yeh aur yeh humre upper hai jitna time dena hai
    //cookie: {maxAge: 100*6} //15 sec
}));


app.use(flash());
// set assets 
app.use("/", express.static(path.join(__dirname, "/public")));

app.use(express.json());

// global middleware //yeh ek normal function hota hai 
app.use((req, res, next) => { // next yeh sab ek call back hai agr isko yeh mila toh access kr dehga
    res.locals.session = req.session;
    next()// yeh yaha call nahi karenge toh yeh yaha atak jayeegi
})

// set templating 
app.use(expresslayout);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));
 
require("./routes/web")(app) // koi bhi object agr hum pass krte hai function k andr toh humhe mil jata hai by refrence in javaScript




app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})

