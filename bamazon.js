var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "somepassword",
    database: "bamazon"
});

connection.connect(function(err) {
    if(err) throw err;
    serverReady();
});

function endConnect() {
    connection.end();
}

function anotherTry() {
    inquirer.prompt([
        {
            message: "Would you like to buy something else?",
            type: "list",
            choices: ["Yes", "No"],
            name: "newOrder"
        }
    ]).then(function(val) {
        if(val.newOrder === "Yes") serverReady();
        else {
            console.log("Thanks for shopping at Bamazon!");
            endConnect();
        }
    });
}

function displayTable(val) {
    connection.query("SELECT * FROM products", function (err, resp) {
        if(err) throw err;
        for(var i = 0; i < resp.length; i++) {
            console.log("Item ID: ",resp[i].item_id," Product Name: ",resp[i].product_name," Price: ",resp[i].price," Quantity: ",resp[i].stock_quantity);
        }
        if(val === 1){
            anotherTry();
        }
    });
   
}

function serverReady() {
    connection.query("SELECT * FROM products", function (err, resp) {
        if(err) throw err;
        for(var i = 0; i < resp.length; i++) {
            console.log("Item ID: ",resp[i].item_id," Product Name: ",resp[i].product_name," Price: ",resp[i].price," Quantity: ",resp[i].stock_quantity);
        }
        inquirer.prompt([
            {
                message: "What item would you like to purchase?",
                name: "itemID"
            }
        ]).then(function(val) {
            connection.query("SELECT * FROM products WHERE item_id="+val.itemID, function(err, resp) {
                if(err) throw err;
                if(resp[0]) {
                    inquirer.prompt([
                        {
                            message: "How many would you like to purchase?",
                            name: "quantityNum"
                        }
                    ]).then(function(val) {
                        if(resp[0].stock_quantity < parseFloat(val.quantityNum)){
                            console.log("Sorry we do not have enough of that item in stock!");
                            anotherTry();
                        }else {
                            var newQuant = resp[0].stock_quantity - parseFloat(val.quantityNum);
                            connection.query("UPDATE products SET stock_quantity="+newQuant+" WHERE item_id="+resp[0].item_id);
                            displayTable(1);
                        }
                    });
                }else {
                    console.log("Sorry we do not have an item with that ID");
                    serverReady();
                }
            });
        })
    })
}