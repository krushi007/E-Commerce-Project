const category = require('../../models/categoryModel')
const subcategory = require('../../models/subCategoryModel')
const extraCatgory = require('../../models/extraCatModel')
const brand = require('../../models/brandModel')
const product = require('../../models/productModel')
const user = require('../../models/userModel')
const cart = require('../../models/cart')

const adate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});


module.exports.addUser = async (req, res) => {

    let categoryData = await category.find({ isActive: true })
    let subCategoryData = await subcategory.find({ isActive: true })
    let extraCatgoryData = await extraCatgory.find({ isActive: true })
    var cartData = 0;
    var cartData = 0;
    if(req.user){
        let userCartCount = await cart.find({user_id: req.user.id}).countDocuments();
        req.session.cartData = userCartCount;
        cartData = req.session.cartData;
    }


    return res.render('user/userDashboard', {
        'categoryData': categoryData,
        'subCategoryData': subCategoryData,
        'extraCatgoryData': extraCatgoryData,
        'cartData':cartData,
    })
}

module.exports.addShope = async (req, res) => {

    let catId = req.params.id;
    let subId = req.params.subId;
    let extraId = req.params.extraId;

    // console.log(req.params);

    let productData = await product.find({ categoryId: catId, subCategoryId: subId, extraCategoryId: extraId })
    // console.log(productData);
    let categoryData = await category.find({ isActive: true })
    let subCategoryData = await subcategory.find({ isActive: true })
    let extraCatgoryData = await extraCatgory.find({ isActive: true })
    let brandData = await brand.find({})
    var cartData = 0;
    if(req.user){
        cartData = req.session.cartData;
    }
    // console.log(brandData)

    return res.render('user/shope', {
        'categoryData': categoryData,
        'subCategoryData': subCategoryData,
        'extraCatgoryData': extraCatgoryData,
        'brandData': brandData,
        'productData': productData,
        'cartData' :cartData,

    })
}

module.exports.findBrandWisedata = async (req, res) => {
    console.log(req.body);

    const productData = await product.find({ 'brandId': req.body.brandIds })

    return res.render('user/brandFilter', {
        'productData': productData
    })
}

module.exports.viewDetail = async (req, res) => {

    let categoryData = await category.find({ isActive: true })
    let subCategoryData = await subcategory.find({ isActive: true })
    let extraCatgoryData = await extraCatgory.find({ isActive: true })
    let singleProduct = await product.findById(req.params.id)
    var cartData = 0;
    if(req.user){
        cartData = req.session.cartData;
    }

    return res.render('user/view_detail', {
        'categoryData': categoryData,
        'subCategoryData': subCategoryData,
        'extraCatgoryData': extraCatgoryData,
        'singleProduct': singleProduct,
        'cartData' : cartData
    })
}

module.exports.register = async (req, res) => {

    let categoryData = await category.find({ isActive: true })
    let subCategoryData = await subcategory.find({ isActive: true })
    let extraCatgoryData = await extraCatgory.find({ isActive: true })
    var cartData = 0;
    if(req.user){
        cartData = req.session.cartData;
    }


    return res.render('user/register', {
        'categoryData': categoryData,
        'subCategoryData': subCategoryData,
        'extraCatgoryData': extraCatgoryData,
        'cartData' : cartData
    })
}

module.exports.registerData = async (req, res) => {

    req.body.isActive = req.isActive
    req.body.createdDate = adate
    req.body.updatedDate = adate


    let checkMail = await user.findOne({ email: req.body.email })
    if (checkMail) {
        console.log('you are already register')
        return res.redirect('back')
    }
    else {
        await user.create(req.body)
        console.log('success fully registerd');
    }
}

module.exports.userLogin = async (req, res) => {

    let categoryData = await category.find({ isActive: true })
    let subCategoryData = await subcategory.find({ isActive: true })
    let extraCatgoryData = await extraCatgory.find({ isActive: true })
    var cartData = 0;
    if(req.user){
        let userCartCount = await cart.find({user_id: req.user.id}).countDocuments();
        req.session.cartData = userCartCount;
        cartData = req.session.cartData;
    }
    console.log(cartData);
    return res.render('user/userLogin', {
        'categoryData': categoryData,
        'subCategoryData': subCategoryData,
        'extraCatgoryData': extraCatgoryData,
        'cartData':cartData,
    })
}

module.exports.userLoginCheck = async (req, res) => {
    return res.redirect('/user')
}

module.exports.addTocart = async (req, res) => {
    // console.log(req.body);
    let cartData = await cart.find({ user_id: req.body.user_id, product_id: req.body.product_id })
    
    if (cartData.length == 0) {
        req.body.isActive = req.isActive
        req.body.createdDate = adate
        req.body.updatedDate = adate
        await cart.create(req.body)

        let userCartCount = await cart.find({user_id: req.body.user_id}).countDocuments();
        req.session.cartData = userCartCount;
        console.log(userCartCount)

        console.log('product added');
        return res.redirect('back')
    }
    else {
        console.log('product is already add');
        return res.redirect('back')
    }
}

module.exports.cartPage = async(req,res) =>{
    let categoryData = await category.find({ isActive: true })
    let subCategoryData = await subcategory.find({ isActive: true })
    let extraCatgoryData = await extraCatgory.find({ isActive: true })
    var cartData = 0;
    if(req.user){
        cartData = req.session.cartData;
    }

    let cartUserData = await cart.find({'user_id': req.user.id}).populate('product_id').exec()
    // console.log(cartUserData)

    return res.render('user/cart',{
        'categoryData': categoryData,
        'subCategoryData': subCategoryData,
        'extraCatgoryData': extraCatgoryData,
        'cartData' : cartData,
        'cartUserData': cartUserData
    })
}

module.exports.productQuantity = async(req,res) =>{
    let cartQuality = await cart.findOne({product_id:req.body.productId,user_id:req.user.id});

    if(cartQuality)
    {
        let cartUpdate = await cart.findByIdAndUpdate(cartQuality.id,{
            quantity : req.body.quantity
        })
    }
}