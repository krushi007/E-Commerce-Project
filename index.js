const express = require('express')

const port = 9000

const app = express()

const path = require('path')

// const mongoose = require('mongoose');
// const url = "mongodb+srv://krushi_chabhadiya:krushi12345@krushi007.auvl8ev.mongodb.net/E-Commerce?retryWrites=true";

// mongoose.connect(url,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true 
// })
//     .then( () => {
//         console.log('Connected to database ')
//     })
//     .catch( (err) => {
//         console.error(`Error connecting to the database. \n${err}`);
//     })

const db = require('./config/mongoose')
const passport = require('passport')
const passportLocal = require('./config/passport-local')
const session = require('express-session')

const cookie = require('cookie')

const flash = require('connect-flash')
const customMiddleware = require('./config/middleware')

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded())

app.use(express.static('assets'))

app.use("/uploads",express.static(path.join(__dirname,'/uploads')))



app.use(session({
    name : "pass",
    secret : 'codeAdmin',
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 10000*60*60
    }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.showData)

app.use(flash());
app.use(customMiddleware.setFlash);

app.use('/',require('./routes/adminRoute/index'))

app.use('/user',require('./routes/userRoute/index'))

app.listen(port,(err)=>{
    if(err)
    {
        console.log('port is not running');
    }
    console.log('port is running on',port);
})