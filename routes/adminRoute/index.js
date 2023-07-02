const express = require('express')

const routes = express.Router()

const adminCon = require('../../controller/adminCon/adminCon')

const admin = require('../../models/adminModel')

const category = require('../../models/categoryModel')

const passport = require('passport')

routes.get('/',adminCon.adminLogin)

routes.get('/dashboard',passport.checkAuthenticatedUser,adminCon.dashboard)

routes.get('/addData',passport.checkAuthenticatedUser,adminCon.addData)

routes.post('/insertAdmin',passport.checkAuthenticatedUser,admin.uploadedAvtar,adminCon.insertAdmin)

routes.post('/checkLogin',passport.authenticate('admin-login', { failureRedirect: "/" }),adminCon.checkLogin)

routes.get('/profile',passport.checkAuthenticatedUser,adminCon.profile)

routes.get('/logOut',passport.checkAuthenticatedUser, async (req, res) => {
    req.logout(function (err) {
        if (err)
        { 
            next() 
        }
        req.flash('success','logout')
        return res.redirect('/')
    });
})

routes.get('/forgotPass',adminCon.forgotPass)

routes.post('/checkEmail',adminCon.checkEmail)

routes.get('/otp',adminCon.otp)

routes.post('/checkOtp',adminCon.checkOtp)

routes.get('/changePass',passport.checkAuthenticatedUser,adminCon.changePass)

routes.post('/newPass',passport.checkAuthenticatedUser,adminCon.newPass)

routes.get('/changePassword',adminCon.changePassword)

routes.post('/forgotNewpassword',adminCon.forgotNewpassword)

routes.use('/addCategory',passport.checkAuthenticatedUser,require('./category'))

routes.use('/addSubCategory',passport.checkAuthenticatedUser,require('./subCategoryRoute'))

routes.use('/extraCategory',passport.checkAuthenticatedUser,require('./extraCategoryRoute'))

routes.use('/brand',passport.checkAuthenticatedUser,require('./brandRoute'))

routes.use('/type',passport.checkAuthenticatedUser,require('./typeRoute'))

routes.use('/product',passport.checkAuthenticatedUser,require('./productRoute'))

module.exports = routes