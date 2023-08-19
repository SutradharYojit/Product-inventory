const express = require('express');
const basicAuth = require('basic-auth');
const Products = require('../models/productModel');
const router = express();


const productItem = []; //LIST of productsItem Model

// ADD THE PRODUCT iTEM
router.post('/', (req, res) => {
    const { productId, title, price, quantity, description } = req.body;
    const product = productItem.find(product => product.productId === productId);

    const newItem = new Products(productId, title, price, quantity, description);
    if (product) {
        res.status(400).json({
            message: "Product already exists"
        });

    } else {
        productItem.push(newItem);
        res.status(201).json({
            message: "Product added successfully",
            product: newItem,
            request: {
                type: "POST",
            }
        });
    }
});

// GET ALL PRODUCTS 
router.get('/', (req, res) => {
    if (productItem.length == 0) {
        res.status(404).json({
            message: "No products found"
        });
    } else {
        res.status(200).json({
            count: productItem.length,
            productList: productItem,
            request: {
                type: "GET",
            }
        });
    }
});

//Fethch by particular Id
router.get('/:id', (req, res) => {
    const productId = req.params.id;
    const product = productItem.find(product => product.productId === productId);
    console.log(product);
    if (product) {
        res.status(200).json({
            count: product.length,
            productList: product,
            request: {
                type: "GET",
            }
        });
    } else {
        res.status(400).json({ message: 'Item not found' });
    }
});

// update product item
router.put('/:id', (req, res) => {
    const productid = req.params.id;

    const { id, title, price, quantity, description, } = req.body;
    const productUpdate = productItem.find(product => product.productId === productid);

    console.log(productUpdate);
    if (productUpdate && productid != null) {
        productUpdate.productId = id;
        productUpdate.title = title || productUpdate.title;
        productUpdate.price = price || productUpdate.price;
        productUpdate.quantity = quantity || productUpdate.quantity;
        productUpdate.description = description || productUpdate.description;
        res.status(200).json(productUpdate);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});


// Delete a Product item 
router.delete('/:id', authenticate, (req, res) => {
    const productId = req.params.id;
    const productIndex = productItem.find(product => product.id === productId);
    console.log(productIndex);
    if (productIndex !== -1) {
        const deletedItem = productItem.splice(productIndex, 1)[0];
        res.json({
            message: "Product deleted successfully",
            productDelete: deletedItem,
            request: {
                type: "DELETE",
            }
        });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});
// authenticate to the user 
function authenticate(req, res, next) {
    const credentials = basicAuth(req);
    if (
        !credentials ||
        credentials.name !== "Yojit" ||
        credentials.pass !== "78945"
    ) {
        res.status(401).send("Invalid credentials");
    } else {
        next();
    }
}

module.exports = router;