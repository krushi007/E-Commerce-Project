const category = require("../../models/categoryModel");

const subCategory = require('../../models/subCategoryModel');

const extraCategory = require('../../models/extraCatModel');

const brand = require("../../models/brandModel");

const type = require("../../models/typeModel");

const product = require('../../models/productModel')

const adate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
  });


module.exports.addCategory = async (req,res) =>{
    return res.render('admin/category')
}

module.exports.insertCategory = async (req,res) =>{
   console.log(req.file);
   console.log(req.body);

   req.body.isActive = req.isActive
   req.body.createdDate = adate
   req.body.updatedDate = adate
 
   var imagePath = ''

   if (req.file) {
       imagePath = category.avtarPath + "/" + req.file.filename
       req.body.categoryImage = imagePath
   }

   let categoryData = await category.create(req.body)
   if(categoryData)
   {
        req.flash('success','data inserted')
       return res.redirect('back')
   }
   else{
        req.flash('error','somthing wrong')
       return res.redirect('back')
   }
}

module.exports.viewCategory = async (req,res) =>{
    let search = ''
    if (req.query.search) {
        search = req.query.search
    }

    let page = 1

    if (req.query.page) {
        page = req.query.page
    }

    const limit = 4;

    let categoryData = await category.find({
        $or: [
            { 'categoryName': { $regex: search, $options: 'i' } },

        ]
    })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    let count = await category.find({
        $or: [
            { 'categoryName': { $regex: search, $options: 'i' } },

        ]
    }).countDocuments();

    if (categoryData) {
        return res.render('admin/viewCategory', {
            'categoryData': categoryData,
            'totalPage': Math.ceil(count / limit),
            'searchData': search,
            'currentPage': page
        })
    }
    else {
        return res.redirect('/viewCategory')
    }
}

module.exports.active = async (req,res) =>{
    let categoryActive= await category.findByIdAndUpdate(req.params.id, {isActive : false})

    let  subCategoryActive = await subCategory.findByIdAndUpdate(req.params.id, {isActive : false})

    let  extraCategoryActive = await extraCategory.findByIdAndUpdate(req.params.id,{isActive : false }) 

    let  brandActive = await brand.findByIdAndUpdate(req.params.id,{isActive : false }) 

    let  typeActive = await type.findByIdAndUpdate(req.params.id,{isActive : false }) 

    let  productActive = await product.findByIdAndUpdate(req.params.id,{isActive : false }) 
    
    if(categoryActive && subCategoryActive && extraCategoryActive && brandActive && typeActive && productActive )
    {
        req.flash('success','Active successfully')
        return res.redirect('back')
    }
    else{
        return res.redirect('back')
    }
}

module.exports.deactive = async (req,res) =>{
    let categoryDeactive = await category.findByIdAndUpdate(req.params.id, {isActive : true})

    let subCategoryDeactive = await subCategory.findByIdAndUpdate(req.params.id, {isActive : true})
    
    let  extraCategoryDeactive = await extraCategory.findByIdAndUpdate(req.params.id,{isActive : true })

    let  brandDeactive = await brand.findByIdAndUpdate(req.params.id,{isActive : true })

    let  typeDeactive = await type.findByIdAndUpdate(req.params.id,{isActive : true })

    let  productDeactive = await product.findByIdAndUpdate(req.params.id,{isActive : true })

    
    if(categoryDeactive && subCategoryDeactive && extraCategoryDeactive && brandDeactive && typeDeactive && productDeactive)  
    {
        req.flash('success','Deactive successfully')
        return res.redirect('back')
    }
    else{
        return res.redirect('back')
    }
}

module.exports.multipleDelete = async (req,res) => {
    console.log(req.body)
}

module.exports.deleteCategory = async(req,res) =>{
    console.log(req.params);
    let categoryDelete = await category.findByIdAndDelete(req.params.id)
    if(categoryDelete)
    {
        return res.redirect('back')
    }
    else{
        return res.redirect('back')
    }
}