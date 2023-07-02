const express = require('express')

const routes = express.Router()

const extraCon = require('../../controller/adminCon/extraCategoryCon')

routes.get('/',extraCon.extraCategory)

routes.post('/getSubCategory',extraCon.getSubData)

routes.post('/insertExtraCat',extraCon.insertExtraCat)

routes.get('/viewExtraCategory',extraCon.viewExtraCategory)

routes.get('/deleteExtra/:id',extraCon.deleteExtra)

module.exports = routes