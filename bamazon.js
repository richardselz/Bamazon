var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "somepassword",
    database: "bamazon"
});

connection.connect(function(err) {
    if(err) throw err;
    serverReady();
});

function serverReady() {
    connection.query("SELECT * FROM products", function (err, resp) {
        for(var i = 0; i < resp.length; i++) {
            console.log("Item ID: ",resp[i].item_id," Product Name: ",resp[i].product_name," Price: ",resp[i].price," Quantity: ",resp[i].stock_quantity);
        }
        iquirer.prompt([
            {
                message: "What item would you like to purchase?",
                name: "itemID"
            }
        ]).then(function(val) {
            if(connection.query("SELECT * FROM products WHERE item_id="+val.itemID) {
                console.log("In the if");
            })
        })
    })
}