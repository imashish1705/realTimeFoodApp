
const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customer/cartController");
const guest = require("../app/http/middleware/guest")
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
}

module.exports = initRoutes