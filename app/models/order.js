const mongoose = require("mongoose");
const Schema = mongoose.Schema


const orderSchema = new Schema({

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },

items: { type: Object, required: true },
phone: { type: String, required: true},
address: { type: String, required: true},
paymentType: { type: String, default: 'COD'},
paymentStatus: { type: Boolean, default: false },
status: { type: String, default: 'order_placed'},

},{timestamps:true})
// mongoose.model(yaha pr first letter should be capital hona chaiye,kaunsa schema use krna ohai hume)
const Order = mongoose.model("Order",orderSchema);

module.exports = Order;
