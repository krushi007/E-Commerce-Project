
const mongoose = require('mongoose')

const path = require('path');


const cartSchema = mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
  
    product_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product'
    },
    quantity : {
        type : Number,
        require : true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    createdDate: {
        type: String,
        required: true
    },
    updatedDate: {
        type: String,
        required: true
    }
})


const cart = mongoose.model('cart', cartSchema)

module.exports = cart;