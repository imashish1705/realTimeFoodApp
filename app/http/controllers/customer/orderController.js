const Order = require('../../../models/order')
const moment = require("moment")

function orderController () {
    return {
        store(req, res) {
            // Validate request
            console.log(req.body);
            const { address, phone} = req.body
            if(!phone || !address) {
                req.flash("error", "All field are require")
                return  res.redirect("/cart")
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                address,
                phone
            })
            order.save().then(result => {
             req.flash("success","order placed successfully")
             delete req.session.cart

             //Emit
             const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('orderplaced', result)
                
             return res.redirect("/customer/orders")
            }).catch(err => {
              req.flash("error","somethong went wrong")
              return res.redirect("/cart")
            })

        },
       async index(req,res) {
            const order = await Order.find({customerId: req.user._id},
                null, 
                {sort:{"createdAt":-1}})
                res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0,pre-check=0')
            res.render("customers/orders",{orders:order,moment:moment})
            console.log(order);
        },
        async show(req, res) {
            const order = await Order.findById(req.params._id)
            // Authorize user
            if(req.user._id.toString() === order.customerId.toString()) {
                return res.render('customers/singleOrder', { order })
            }
            return  res.redirect('/')
        }
    }
}

module.exports = orderController