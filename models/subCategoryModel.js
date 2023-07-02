
const mongoose = require('mongoose')

const AVTAR_PATH = '/uploads/categoryImage'

const multer = require('multer')

const path = require('path')

const subCategorySchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
     subCategoryName : {
        type : String,
        required : true
    },
    isActive : {
        type : Boolean,
        required : true,
        default :  true
    },
    createdDate : {
        type : String,
        required : true
    },
    updatedDate : {
        type : String,
        required : true
    }
})


const subCategory = mongoose.model('subCategory',subCategorySchema)

module.exports = subCategory;