const category = require('../../models/categoryModel')

const type = require('../../models/typeModel')

const adate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});


module.exports.addtype = async (req,res) =>{
    let categoryData = await category.find({})

    return res.render('admin/type', {
        categoryData: categoryData
    })
}

module.exports.insertType = async (req,res) =>{
    req.body.isActive = req.isActive
    req.body.createdDate = adate
    req.body.updatedDate = adate

    let typeData = await type.create(req.body)

    if (typeData) {
        req.flash('success','data inserted')
        return res.redirect('back')
    }
    else {
        req.flash('error','somthing wrong')
        console.log('typeData data is not inserted');
        return res.redirect('back')
    }
}

module.exports.viewType = async(req,res) =>{
    let search = ''
    if (req.query.search) {
        search = req.query.search
    }

    let page = 1

    if (req.query.page) {
        page = req.query.page
    }

    const limit = 4;

    let typeData = await type.find({
        $or: [
            { 'typeName': { $regex: search, $options: 'i' } },

        ]
    })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    let count = await type.find({
        $or: [
            { 'typeName': { $regex: search, $options: 'i' } },

        ]
    }).countDocuments();

    if (typeData) {
        return res.render('admin/viewType', {
            'typeData': typeData,
            'totalPage': Math.ceil(count / limit),
            'searchData': search,
            'currentPage': page
        })
    }
    else {
        return res.redirect('/viewType')
    }
}

module.exports.deleteType = async(req,res) =>{
    let typeDelete = await type.findByIdAndDelete(req.params.id)
    if(typeDelete)
    {
        return res.redirect('/viewType')
    }
    else{
        return res.redirect('/viewType')
    }
}