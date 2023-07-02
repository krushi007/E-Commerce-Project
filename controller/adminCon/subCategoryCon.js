const category = require('../../models/categoryModel')

const subCategory = require('../../models/subCategoryModel')

const adate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
  });

module.exports.addSubCategory = async (req, res) => {

    let categoryData = await category.find({})

    return res.render('admin/subCategory', {
        'categoryData': categoryData
    })
}

module.exports.insertSubCategory = async (req, res) => {


    req.body.isActive = req.isActive
    req.body.createdDate = adate
    req.body.updatedDate = adate


    let subData = await subCategory.create(req.body)

    if (subData) {
        req.flash('success','data inserted')
        return res.redirect('back')
    }
    else {
        req.flash('error','somthing wrong')
        return res.redirect('back')
    }
}

module.exports.viewSub = async(req,res) =>{

    let search = ''
    if (req.query.search) {
        search = req.query.search
    }

    let page = 1

    if (req.query.page) {
        page = req.query.page
    }

    const limit = 4;

    let subCateData = await subCategory.find({
        $or: [
            { 'subCategoryName': { $regex: search, $options: 'i' } },

        ]
    })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    let count = await subCategory.find({
        $or: [
            { 'subCategoryName': { $regex: search, $options: 'i' } },

        ]
    }).countDocuments();

    if (subCateData) {
        return res.render('admin/viewSubCate', {
            'subCateData': subCateData,
            'totalPage': Math.ceil(count / limit),
            'searchData': search,
            'currentPage': page
        })
    }
    else {
        return res.redirect('/viewSubCate')
    }
}

module.exports.deleteSubCategory = async(req,res) =>{
    // console.log(req.params);
    let deletSubcategory = await subCategory.findByIdAndDelete(req.params.id)

    if(deletSubcategory)
    {
        return res.redirect('back')
    }
    else
    {
        return res.redirect('back')
    }
}