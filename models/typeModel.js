
const mongoose = require('mongoose')

const path = require('path');


const typeCategorySchema = mongoose.Schema({

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
    typeName: {
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


const type = mongoose.model('type', typeCategorySchema)

module.exports = type;