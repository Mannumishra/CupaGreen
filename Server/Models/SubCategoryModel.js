const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    subCateStatus: {
        type: String,
        default: "False"
    }
}, { timestamps: true });

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

module.exports = SubCategory;
