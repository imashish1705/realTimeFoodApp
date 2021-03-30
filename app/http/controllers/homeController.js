const Menu = require("../../models/menu");
function homeController() {
    //factory pattern/function : like closure it is a simple function jo return krti hai object
    return {
        // iske andr sare method method banana hai like CRUD controller
        async index (req,res) { // index : function() {}
        
            const pizzas = await Menu.find()
            return res.render("home", {pizzas: pizzas})
 

        //    Menu.find().then(function(pizzas){
        //     console.log(pizzas)
        //     res.render("home",{pizzas:pizzas});
        //     })
        }
    }
}
module.exports = homeController;