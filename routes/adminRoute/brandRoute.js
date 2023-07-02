const express = require('express')

const routes = express.Router()

const brandCon = require('../../controller/adminCon/brandCon')

routes.get('/',brandCon.getbrand)

routes.post('/getExtraCategory',brandCon.getExtraCategory)

routes.post('/insertBrand',brandCon.insertBrand)

routes.get('/viewBrand',brandCon.viewBrand)

routes.get('/deleteBrand/:id',brandCon.deleteBrand)

module.exports = routes