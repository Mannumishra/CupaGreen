const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
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

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
