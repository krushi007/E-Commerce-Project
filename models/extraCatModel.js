
const mongoose = require('mongoose')

const path = require('path');


const extraCategorySchema = mongoose.Schema({

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
  
    subCategoryId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subCategory'
    },

    extraCategoryName: {
        type: String,
        required: true
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


const extraCategory = mongoose.model('extraCategory', extraCategorySchema)

module.exports = extraCategory;