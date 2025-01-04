const mongoose = require("mongoose")

const MainbannerSchmea = new mongoose.Schema({
    bannerImage: {
        type: String,
        required: true
    },
    bannerStatus: {
        type: Boolean,
        required: false
    }
})

const MainBanner= mongoose.model("MainBanner" , MainbannerSchmea)

module.exports = MainBanner