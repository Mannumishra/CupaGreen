const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    cateStatus:{
        type:String,
        default:"False"
    }
},{timestamps:true})

const Category = mongoose.model("Category" ,CategorySchema)

module.exports = Category