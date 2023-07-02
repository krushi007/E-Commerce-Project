const category = require('../../models/categoryModel')

const brand = require('../../models/brandModel')

const type = require('../../models/typeModel')

const product = require('../../models/productModel')

module.exports.addProduct = async (req, res) => {
    let categoryData = await category.find({})
    return res.render('admin/product', {
        categoryData: categoryData
    })
}

module.exports.getBrandType = async (req, res) => {

    let catId = req.body.categoryId
    let subId = req.body.subCategoryId
    let extraId = req.body.extraCategoryId

    let brandData = await brand.find({ categoryId: catId, subCategoryId: subId, extraCategoryId: extraId })
    let typeData = await type.find({ categoryId: catId, subCategoryId: subId, extraCategoryId: extraId })

    return res.render('admin/brandType', {
        'brandData': brandData,
        'typeData': typeData,
    })
}

module.exports.insertProduct = async (req, res) => {
    // console.log(req.files);
    const adate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
    });

    var singleImage = ''
    if (req.files.image) {
        singleImage = product.avtarPath + "/" + req.files.image[0].filename
    }
    var multiImage = []
    if (req.files.multipleImage) {
        for (var i = 0; i < req.files.multipleImage.length; i++) {
            multiImage.push(product.imagePath+"/"+req.files.multipleImage[i].filename)
        }
    }

    req.body.image = singleImage
    req.body.multipleImage = multiImage
    req.body.isActive = req.isActive
    req.body.createdDate = adate
    req.body.updatedDate = adate


    let productData = product.create(req.body)

    if (productData) {
        req.flash('success','data inserted')
        return res.redirect('back')
    }
    else {
        req.flash('error','somthing wrong')
        return res.redirect('back')
    }


}

module.exports.viewProduct = async(req,res) =>{
    let search = ''
    if (req.query.search) {
        search = req.query.search
    }

    let page = 1

    if (req.query.page) {
        page = req.query.page
    }

    const limit = 4;

    let productData = await product.find({
        $or: [
            { 'porductName': { $regex: search, $options: 'i' } },

        ]
    })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    let count = await product.find({
        $or: [
            { 'porductName': { $regex: search, $options: 'i' } },

        ]
    }).countDocuments();

    if (productData) {
        return res.render('admin/viewProduct', {
            'productData': productData,
            'totalPage': Math.ceil(count / limit),
            'searchData': search,
            'currentPage': page
        })
    }
    else {
        return res.redirect('/viewSubCate')
    }
}