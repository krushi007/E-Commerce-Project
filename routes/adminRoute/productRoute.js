const express = require('express')

const routes = express.Router()

const porductCon = require('../../controller/adminCon/productCon')

const product = require('../../models/productModel')

routes.get('/',porductCon.addProduct)

routes.post('/getBrandType',porductCon.getBrandType)

routes.post('/insertProduct',product.uploadedAvtar,porductCon.insertProduct)

routes.get('/viewProduct',porductCon.viewProduct)

module.exports = routes