
const admin = require("../../models/adminModel")

const bcrypt = require('bcrypt')

const nodemailer = require('nodemailer');
const routes = require("../../routes/adminRoute");

const adate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
  });


module.exports.adminLogin = async (req,res) =>{
    if (req.isAuthenticated()) {
        
        return res.redirect('/dashboard')
    }
    else {
        return res.render('admin/login')
    }
}

module.exports.profile = async (req,res) =>{
    let accountData = req.user

    return res.render('admin/profile', {
        'profileData': accountData
    })
}

module.exports.dashboard = async (req,res) =>{
    return res.render('admin/dashboard')
}

module.exports.addData = async (req,res) =>{
    return res.render('admin/addData')
}

module.exports.insertAdmin = async (req,res)=>{

    req.body.name = req.body.fname + ' ' + req.body.lname
    req.body.isActive = req.isActive
    req.body.role = req.role
    req.body.createdDate = adate
    req.body.updatedDate = adate

    const hashPassword = await bcrypt.hash(req.body.password,10);
    req.body.password = hashPassword

    var imagePath = ''

    if (req.file) {
        imagePath = admin.avtarPath + "/" + req.file.filename
        req.body.profile = imagePath
    }

    let adminData = await admin.create(req.body)
    if(adminData)
    {
        req.flash('success', "Admin Record inserted successfully")
        return res.redirect('back')
    }
    else{
        req.flash('error', "Admin Record inserted successfully")
        return res.redirect('back')
    }
}


module.exports.checkLogin = async (req,res) =>{
    req.flash('success','login success')
    req.flash('error','somthing wrong')
    return res.redirect('/dashboard')
}

module.exports.changePass = async (req,res) =>{
    return res.render('admin/updatePass')
}

module.exports.forgotPass = async(req,res) =>{

    return res.render('admin/forgotPass')
}

module.exports.checkEmail = async(req,res) =>{
    console.log(req.body);
    let mail = await admin.findOne({email : req.body.email})

    if(mail)
    {
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "b2186e8edb3b7f",
              pass: "79577dab69b949"
            }
          });

          let otp = Math.ceil(Math.random()*10000)
          res.cookie('otp',otp)
          res.cookie('mail',req.body.email)

          let info = await transport.sendMail({
            from: 'yilol93271@aramask.com', // sender address
            to: req.body.email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>${otp}</b>`, // html body
          });

          return res.redirect('/otp')
    }
    else{
        return res.redirect('back')
    }
}

module.exports.otp = async(req,res) =>{
    return res.render('admin/otp')
}

module.exports.changePassword = async(req,res)=>{
    return res.render('admin/changePassword')
}

module.exports.checkOtp = async(req,res) =>{
    if(req.body.otp == req.cookies.otp)
    {
        return res.redirect('/changePassword')
    }
    else{
        return res.redirect('/')
    }
}

module.exports.newPass = async(req,res) =>{
    console.log(req.body);

    let adminData = req.user

    let match = await bcrypt.compare(req.body.cpass,adminData.password)
    console.log(match);

    if(match)
    {
        if(req.body.cpass != req.body.npass)
        {
            if(req.body.npass == req.body.copass)
            {
                let oldRecord = await admin.findById(adminData._id)
                if(oldRecord)
                {
                    let hashPass = await bcrypt.hash(req.body.npass,10)
                    let chpass = await admin.findByIdAndUpdate(oldRecord.id,{
                        password : hashPass
                    })
                    return res.redirect('/')
                }
                else{
                    console.log('smothing wrong');
                    return res.redirect('/changePass')
                }
            }
            else{
                console.log('npass and copass is not same')
                return res.redirect('/changePass')
            }
        }
        else{
            console.log('cpass and npass is same')
            return res.redirect('/changePass')
        }
    }
    else{
        console.log('password and currunt pass is not same')
        return res.redirect('/changePass')
    }
}

module.exports.forgotNewpassword = async(req,res) =>{
    if(req.body.npass == req.body.copass)
    {
        let email = await admin.findOne({email : req.cookies.mail})
        if(email)
        {
            let data = await admin.findById(email.id)
            if(data)
            {
                let hashPass = await bcrypt.hash(req.body.npass)
                let cp = await admin.findByIdAndUpdate(data.id,{password : hashPass})
                if(cp)
                {
                    return res.redirect('/')
                }
                else{
                    console.log('not updated');
                    return res.redirect('back')
                }
            }
            else{
                console.log('data is not found');
                return res.redirect('back')
            }
        }
        else{
            console.log('email is not found');
            return res.redirect('back')
        }
    }
    else{
        console.log("npass and copass not mathc");
        return res.redirect('back')
    }
}