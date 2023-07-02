const express = require('express')

const routes = express.Router()

const userCon = require('../../controller/userCon/userCon')

const passport = require('passport')

routes.get('/',userCon.addUser)

routes.get('/shope/:id/:subId/:extraId',userCon.addShope)

routes.post('/findBrandWisedata',userCon.findBrandWisedata)

routes.get('/viewDetail/:id',userCon.viewDetail)

routes.get('/register',userCon.register)

routes.post('/registerData',userCon.registerData)

routes.get('/userLogin',userCon.userLogin)

routes.post('/userLoginCheck',passport.authenticate('user-login', { failureRedirect: "/" }),userCon.userLoginCheck)

routes.get('/userLogout',async (req,res,next)=>{
    req.logout(function (err) {
        if (err)
        { 
            next() 
        }
        return res.redirect('/user')
    });
})

routes.post('/addTocart',userCon.addTocart)

routes.get('/cartPage',userCon.cartPage)

routes.post('/productQuantity',userCon.productQuantity)

module.exports = routes