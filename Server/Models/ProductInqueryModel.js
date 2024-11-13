const mongoose = require("mongoose");

const ProductInquirySchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",  // Reference to the Product model
        required: [true, 'Product ID is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    phone:{
        type: Number,
        required: [true, 'Phone Number is required'],
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
    },
    query: {
        type: String,
        required: [true, 'Query is required'],
    },
    inquiryStatus: {
        type: String,
        default: "Pending"
    }
}, { timestamps: true });

const ProductInquiry = mongoose.model("ProductInquiry", ProductInquirySchema);

module.exports = ProductInquiry;
