const mongoose = require('mongoose');

// Schema

const ProductsSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true 
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
);

const ProductsModel = mongoose.model('products', ProductsSchema);
module.exports = ProductsModel;