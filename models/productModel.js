
const mongoose = require('mongoose')

const singleProduct = '/uploads/singleProduct'

const multipleProduct = '/uploads/multipleProduct'

const multer = require('multer')

const path = require('path')

const productSchema = mongoose.Schema({

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
    brandId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'brand'
    },
    typeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'type'
    },
    porductName : {
        type : String,
        required : true
    },
    oldPrice : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    rating : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    multipleImage : {
        type : Array,
        required : true
    },
    isActive : {
        type : Boolean,
        required : true,
        default :  true
    },
    description : {
        type : String,
        required : true,
    },
    color : {
        type : Array,
        required : true,
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

const imageStorage = multer.diskStorage({
    destination : function(req,file,cb) {
        if(file.fieldname == 'multipleImage'){
             cb(null,path.join(__dirname,'..',multipleProduct))
        }
        else{
            cb(null,path.join(__dirname,'..',singleProduct))
        }
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})

productSchema.statics.uploadedAvtar = multer({storage : imageStorage}).fields([{name : 'image'}, {name : 'multipleImage'}])
productSchema.statics.avtarPath = singleProduct
productSchema.statics.imagePath = multipleProduct

const product = mongoose.model('product',productSchema)

module.exports = product;