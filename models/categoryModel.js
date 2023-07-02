
const mongoose = require('mongoose')

const AVTAR_PATH = '/uploads/categoryImage'

const multer = require('multer')

const path = require('path')

const categorySchema = mongoose.Schema({
    categoryName : {
        type : String,
        required : true
    },
    categoryImage : {
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

const imageStorage = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null,path.join(__dirname,'..',AVTAR_PATH))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})

categorySchema.statics.uploadedAvtar = multer({storage : imageStorage}).single('categoryImage')
categorySchema.statics.avtarPath = AVTAR_PATH

const category = mongoose.model('category',categorySchema)

module.exports = category;