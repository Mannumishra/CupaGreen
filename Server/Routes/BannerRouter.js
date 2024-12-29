const express = require("express");
const { createBanner, getBanners, updateBanner, deleteBanner, getSingleBanners } = require("../Controllers/BannerController");
const upload = require("../MiddleWares/Multer");
const BannerRouter = express.Router();

BannerRouter.post("/add-banners", upload.single("bannerImage"), createBanner);
BannerRouter.get("/all-banner", getBanners);
BannerRouter.get("/single-banner/:id", getSingleBanners);
BannerRouter.put("/update-banner/:id", upload.single("bannerImage"), updateBanner);
BannerRouter.delete("/delete-banner/:id", deleteBanner);

module.exports = BannerRouter;
