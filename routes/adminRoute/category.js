const express = require('express')

const routes = express.Router()

const category = require('../../models/categoryModel')

const categoryCon = require('../../controller/adminCon/categoryCon')

routes.get('/',categoryCon.addCategory)

routes.post('/insertCategory',category.uploadedAvtar,categoryCon.insertCategory)

routes.get('/viewCategory',categoryCon.viewCategory)

routes.get('/active/:id',categoryCon.active)

routes.get('/deactive/:id',categoryCon.deactive)

routes.post('/multipleDelete',categoryCon.multipleDelete)

routes.get('/deleteCategory/:id',categoryCon.deleteCategory)


module.exports = routes