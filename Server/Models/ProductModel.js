const mongoose = require("mongoose")

const ProductModelSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",  // Reference to the Category model
        required: true,
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",  // Reference to the Subcategory model
        required: true,
    },
    productName: {
        type: String,
        required: true,
        set: (val) => val.toUpperCase(),
    },
    productSubDetails: {
        type: String,
        required: true
    },
    productDetails: {
        type: String,
        required: true
    },
    productImage: {
        type: String, 
        required: true
    }
}, { timestamps: true })

const Product = mongoose.model("Product", ProductModelSchema);
module.exports = Product;