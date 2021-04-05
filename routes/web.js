const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customer/cartController");
const orderController = require("../app/http/controllers/customer/orderController");
const AdminOrderController = require("../app/http/controllers/admin/orderController");
const statusController = require("../app/http/controllers/admin/statusController");
//const { authenticate } = require("passport");

//middlewares
const guest = require("../app/http/middleware/guest")
const auth = require("../app/http/middleware/auth")
const admin = require("../app/http/middleware/admin");


function initRoutes(app) { // yaha pr ek parameter recieve kr rahe hai ....yeh kaise ho rah hai recieve ???kuki node project k andr har ek file hoti hai module
    // index normal function hai
    
    app.get("/", homeController().index);
    app.get("/login", guest,authController().login);
    app.post("/login", authController().postlogin);
    app.get("/register", guest,authController().register);
    app.post("/register", authController().postRegister);
    app.get("/cart",cartController().cart); 
    app.post("/update-cart",cartController().update);
    app.post("/logout", authController().logout);


   // customer routes
   app.post("/orders" ,auth,orderController().store);
   app.get("/customer/orders",auth,orderController().index);
   app.get('/customer/orders/:_id', auth, orderController().show)

   //admin routes
   app.get("/admin/orders", admin,AdminOrderController().indexAdmin);
   app.post("/admin/order/status", admin,statusController().update);

}

module.exports = initRoutes