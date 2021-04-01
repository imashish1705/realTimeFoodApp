const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt");
function init(passport) {
 passport.use(new LocalStrategy({ usernameField: "email" }, async (email,password,done) => {
     //login
     //check if email exist 
     const user = await User.findOne({email:email})
     if(!user) {
         return done(null,false,{message: "No user with this email"})
     }
      
     bcrypt.compare(password, user.password).then(match => {
         if(match) {
             return done(null, user, {message: "Logged In successful"})
         }
         return done(null,false,{message:"Wrong User Name or Password"})
     }).catch(err => {
        return done(null,false,{message:"Something went wrong"})
     })
     
 }))
//agr user login in hogaya hai aya nahi hai ....passport humhe chance dehta hai ki kya store krna hai hum 
passport.serializeUser((user,done) => {
    done(null,user._id)
})
passport.deserializeUser((id, done) => {
     User.findById(id, (error,user) => {
         done(error,user)
     })
})



}
module.exports = init