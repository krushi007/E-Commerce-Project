const category = require("../../models/categoryModel")

const subCategory = require("../../models/subCategoryModel")

const extraCategory = require('../../models/extraCatModel')

const brand = require('../../models/brandModel')

const adate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});

module.exports.getbrand = async (req, res) => {
    let categoryData = await category.find({})

    return res.render('admin/brand', {
        categoryData: categoryData
    })
}

module.exports.getExtraCategory = async (req, res) => {
    let extradata = await extraCategory.find({ subCategoryId: req.body.subCategoryId })

    return res.render('admin/ajaxData', {
        extradata: extradata
    })
}

module.exports.insertBrand = async (req, res) => {

    req.body.isActive = req.isActive
    req.body.createdDate = adate
    req.body.updatedDate = adate

    let brandData = await brand.create(req.body)

    if (brandData) {
        req.flash('success','data inserted')
        return res.redirect('back')
    }
    else {
        req.flash('error','somthing wrong')
        console.log('brand data is not inserted');
        return res.redirect('back')
    }
}

module.exports.viewBrand = async(req,res) =>{
    let search = ''
    if (req.query.search) {
        search = req.query.search
    }

    let page = 1

    if (req.query.page) {
        page = req.query.page
    }

    const limit = 4;

    let brandData = await brand.find({
        $or: [
            { 'brandName': { $regex: search, $options: 'i' } },

        ]
    })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    let count = await brand.find({
        $or: [
            { 'brandName': { $regex: search, $options: 'i' } },

        ]
    }).countDocuments();

    if (brandData) {
        return res.render('admin/viewBrand', {
            'brandData': brandData,
            'totalPage': Math.ceil(count / limit),
            'searchData': search,
            'currentPage': page
        })
    }
    else {
        return res.redirect('/viewBrand')
    }
}

module.exports.deleteBrand = async(req,res) =>{
    let brandDelete = await brand.findByIdAndDelete(req.params.id)
    if(brandDelete)
    {
        return res.redirect('/viewBrand')
    }
    else{
        return res.redirect('/viewBrand')
    }
}