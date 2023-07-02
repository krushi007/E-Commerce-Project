const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1/E-Commerce")

const db = mongoose.connection

db.once('open',function(err){
    if(err)
    {
        console.log(err);
    }
    console.log('db is connected');
})

module.exports = db