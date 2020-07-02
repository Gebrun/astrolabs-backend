const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/ProductsModel');

// POST route for products

router.post(
    '/',
    (req, res) => {

        // Read the 'Body' within POST request

        const formData = {
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            qty: req.body.qty
        };

                // Save/Instantiate the data to database (feeds database)

                const newProductsModel = new ProductsModel(formData);
                newProductsModel.save();
        
                res.send('Product has been saved!');
        
                }
            );

// Export the router

module.exports = router;