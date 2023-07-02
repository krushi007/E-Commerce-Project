const express = require('express')

const routes = express.Router()

const typeCon = require('../../controller/adminCon/typeCon')
const type = require('../../models/typeModel')

routes.get('/',typeCon.addtype)

routes.post('/insertType',typeCon.insertType)

routes.get('/viewType',typeCon.viewType)

routes.get('/deleteType/:id',typeCon.deleteType)

module.exports = routes