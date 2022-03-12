const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");


//Create  a Product -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});


//Get all Product
exports.getAllProducts = catchAsyncError(async(req, res) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const product = await apiFeatures.query; 

    res.status(200).json({        
        success: true,
        product
    });
});


//Update Product -- Admin
exports.updateProduct = catchAsyncError(async (req, res, next) =>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found!!!", 404))
    } 

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidator: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
});


//Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) =>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found!!!", 404))
    }

    await product.remove();
    res.status(200).json({
        success: true,
        massage: "Product Deleted Successfully!!!"
    })
});


//Get Product Details
exports.getProductDetails =  catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found!!!", 404))
    }

    res.status(200).json({
        success: true,
        product,
        productCount
    })

});