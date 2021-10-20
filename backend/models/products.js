const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const ProductSchema = new mongoose.Schema({
    description:{
        type: String,
        require: true,
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: false,
    },
    quantity:{
        type: Number,
        require: true,
    }
});

const Products = mongoose.model('Products', ProductSchema);

module.exports = Products;