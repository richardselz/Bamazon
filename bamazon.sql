DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT(10) NOT NULL AUTO_INCREMENT;
    product_name VARCHAR(30) NOT NULL;
    department_name VARCHAR(30) NOT NULL;
    price INT(10) NOT NULL;
    stock_quantity INT(10) NOT NULL;
    PRIMARY KEY (item_id);
)

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("iPhone 6", "Phone", 12, 5), ("iPhone 7", "Phone", 13, 2), ("Samsung S7", "Phone", 5, 1), ("Surface Pro", "Computer", 44, 3), ("Mac Book Pro", "Computer", 12, 1), ("Chrome", "Web Browser", 0, 1000), ("Safari", "Web Browser", 0, 22), ("Opera", "Web Browser", 0, 4), ("IE", "Web Browser", 0, 1), ("Netscape", "Web Browser", 0, 0);
SELECT * FROM products;