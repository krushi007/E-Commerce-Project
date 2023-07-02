
const mongoose = require('mongoose')

const path = require('path');


const brandCategorySchema = mongoose.Schema({

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
  
    subCategoryId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subCategory'
    },

    extraCategoryId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'extraCategory'
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    brandName: {
        type: String,
        required: true
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


const brand = mongoose.model('brand', brandCategorySchema)

module.exports = brand;