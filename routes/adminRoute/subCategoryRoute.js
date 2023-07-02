const express = require('express')

const routes = express.Router()

const subCon = require('../../controller/adminCon/subCategoryCon')

const subCategory = require('../../models/subCategoryModel')

routes.get('/',subCon.addSubCategory)

routes.post('/insertSubCategory',subCon.insertSubCategory)

routes.get('/viewSub',subCon.viewSub)

routes.get('/deleteSubCategory/:id',subCon.deleteSubCategory)




module.exports = routes