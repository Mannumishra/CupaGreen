const express = require("express");
const upload = require("../MiddleWares/Multer");
const { createBanner, getBanners, getSingleBanners, updateBanner, deleteBanner } = require("../Controllers/MainBannerController");
const MainBannerRouter = express.Router();

MainBannerRouter.post("/add-mainbanners", upload.single("bannerImage"), createBanner);
MainBannerRouter.get("/all-mainbanner", getBanners);
MainBannerRouter.get("/single-mainbanner/:id", getSingleBanners);
MainBannerRouter.put("/update-mainbanner/:id", upload.single("bannerImage"), updateBanner);
MainBannerRouter.delete("/delete-mainbanner/:id", deleteBanner);

module.exports = MainBannerRouter;
