
const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customer/cartController");
function initRoutes(app) { // yaha pr ek parameter recieve kr rahe hai ....yeh kaise ho rah hai recieve ???kuki node project k andr har ek file hoti hai module
    // index normal function hai
    
    app.get("/", homeController().index);
    app.get("/login", authController().login);
    app.get("/register", authController().register);
    app.get("/cart",cartController().cart);
    
    app.post("/update-cart",cartController().update);
    
}

module.exports = initRoutes