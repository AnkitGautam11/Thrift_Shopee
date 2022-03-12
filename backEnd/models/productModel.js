const mongoose = require("mongoose");
const { stringify } = require("querystring");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"]
    },
    Stock: {
        type: Number,
        required: [true, "Please enter product Stock"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type:String,
                required: true,
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: true,
    },

    createdAt:{
        type: Date,
        default: Date.now
    }

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;