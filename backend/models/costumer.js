const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const CostumerSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    userId:{
        type: String,
        require: true,
    },
    prod:[{
        description:{
            type: String,
            require: false,
        },
        quantity:{
            type: String,
            require: false,
        }
    }],
    createAt:{
        type: Date,
        default: Date.now,
    }   
                        
});

const Costumer = mongoose.model('Costumer', CostumerSchema);

module.exports = Costumer;