const passport = require("passport");

const passportLocal = require('passport-local').Strategy

const Admin = require('../models/adminModel');

const User = require('../models/userModel')

const bcrypt = require('bcrypt')

passport.use('admin-login',new passportLocal({
    usernameField : "email"
},async function(email,password,done){
    let adminData = await Admin.findOne({email : email})
    if(adminData)
    {
        let matchPassword = await bcrypt.compare(password,adminData.password)
        if(!adminData || !matchPassword){
            return done(null,false)
        }
        else{
            return done(null,adminData)
        }
    }
    else{
        return done(null,adminData)
    }
}))


passport.use('user-login',new passportLocal({
    usernameField : "email"
},async function(email,password,done){
    let user = await User.findOne({email : email})
    if(!user || password != user.password)
    {
        return done(null,false)
    }
    else{
        return done(null,user)
    }
}))

passport.serializeUser(function(adminData,done){
    return done(null, adminData.id)
})

passport.deserializeUser(async function(id, done){
    let admin = await Admin.findById(id)

    if(admin)
    {
        return done(null,admin)
    }
    else{
        let userData = await User.findById(id)
        if(userData)
        {
            return done(null,userData)
        }
        else{
             return done(null,false)
        }
    }
})

passport.checkAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated())
    {
        next();
    }
    else{
        return res.redirect('/')
    }
}

passport.showData = async (req,res,next) =>{

    if(req.isAuthenticated())
    {
        if(req.user.role == "Admin"){
            res.locals.admin = req.user
        }
        else{
            res.locals.user = req.user
        }
    }
    next()
}

module.exports = passport