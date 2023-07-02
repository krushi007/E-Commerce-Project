const category = require('../../models/categoryModel')

const subCategory = require('../../models/subCategoryModel')

const extraCategory = require('../../models/extraCatModel')

const adate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});

module.exports.extraCategory = async (req, res) => {
    let categoryData = await category.find({})
    return res.render('admin/extraCategory', {
        categoryData: categoryData
    })
}

module.exports.getSubData = async (req, res) => {
    let subdata = await subCategory.find({ categoryId: req.body.categoryId })
3

    var optionData = `<option value="">--select subcategory--</option>`

    for (var sd of subdata) {
        optionData += `<option value="${sd.id}">${sd.subCategoryName}</option>`
    }

    return res.json(optionData)
}

module.exports.insertExtraCat = async (req, res) => {
    req.body.isActive = req.isActive
    req.body.createdDate = adate
    req.body.updatedDate = adate

    let extraCategoryData = await extraCategory.create(req.body)

    if(extraCategoryData)
    {
        req.flash('success','data inserted')
        return res.redirect('back')
    }
    else{
        req.flash('error','somthing wrong')
        // console.log('extracategory data is not inserted');
        return res.redirect('back')
    }
}

module.exports.viewExtraCategory = async (req,res) =>{
    let search = ''
    if (req.query.search) {
        search = req.query.search
    }

    let page = 1

    if (req.query.page) {
        page = req.query.page
    }

    const limit = 4;

    let extraData = await extraCategory.find({
        $or: [
            { 'extraCategoryName': { $regex: search, $options: 'i' } },

        ]
    })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    let count = await extraCategory.find({
        $or: [
            { 'extraCategoryName': { $regex: search, $options: 'i' } },

        ]
    }).countDocuments();

    if (extraData) {
        return res.render('admin/viewExtraCategory', {
            'extraData': extraData,
            'totalPage': Math.ceil(count / limit),
            'searchData': search,
            'currentPage': page
        })
    }
    else {
        return res.redirect('/viewExtraCategory')
    }
}

module.exports.deleteExtra = async(req,res) =>{
    let deleteExtraData = await extraCategory.findByIdAndDelete(req.parms.id) 

    if(deleteExtraData)
    {
        return res.redirect('/viewExtraCategory')
    }
    else{
        return res.redirect('/viewExtraCategory')
    }
}
