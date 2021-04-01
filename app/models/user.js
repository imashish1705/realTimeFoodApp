const mongoose = require("mongoose");
const Schema = mongoose.Schema


const userSchema = new Schema({

    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique:true
    },
    password: {
        type: String, required: true
    },
    role: {
        type: String, default:"customer"
    }
},{timestamps:true})
// mongoose.model(yaha pr first letter should be capital hona chaiye,kaunsa schema use krna ohai hume)
const User = mongoose.model("User",userSchema);

module.exports = User;