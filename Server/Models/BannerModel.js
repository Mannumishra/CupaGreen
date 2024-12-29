const mongoose = require("mongoose")

const bannerSchmea = new mongoose.Schema({
    bannerImage: {
        type: String,
        required: true
    },
    bannerStatus: {
        type: Boolean,
        required: false
    }
})

const Banner= mongoose.model("Banner" , bannerSchmea)

module.exports = Banner