
const path = require("path");
const fs = require("fs/promises");
const Banner = require("../Models/BannerModel");

// Helper function to delete a file
const deleteFile = async (filePath) => {
    try {
        if (filePath) {
            const fileToDelete = path.join(__dirname, "..", filePath);
            await fs.access(fileToDelete);
            await fs.unlink(fileToDelete);
            console.log("Deleted file:", filePath);
        }
    } catch (err) {
        console.log("File not found or already deleted:", filePath);
    }
};

// Controller methods
const createBanner = async (req, res) => {
    try {
        const { bannerStatus } = req.body;
        const bannerImage = req.file?.path;

        if (!bannerImage) {
            return res.status(400).json({ message: "Banner image is required." });
        }

        const newBanner = new Banner({ bannerImage, bannerStatus });
        await newBanner.save();

        res.status(201).json({ message: "Banner created successfully.", banner: newBanner });
    } catch (error) {
        if (req.file?.path) await deleteFile(req.file.path);
        res.status(500).json({ message: "Failed to create banner.", error: error.message });
    }
};

const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch banners.", error: error.message });
    }
};

const getSingleBanners = async (req, res) => {
    try {
        const banners = await Banner.findById(req.params.id);
        if (!banners) {
            return res.status(404).json({
                success: false,
                message: "Banner Not found"
            })
        }
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch banners.", error: error.message });
    }
};
const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const { bannerStatus } = req.body;
        const banner = await Banner.findById(id);

        if (!banner) {
            if (req.file?.path) await deleteFile(req.file.path);
            return res.status(404).json({ message: "Banner not found." });
        }

        const newImagePath = req.file?.path;
        const oldImagePath = banner.bannerImage;

        banner.bannerImage = newImagePath || banner.bannerImage;
        if (bannerStatus !== undefined) banner.bannerStatus = bannerStatus;

        await banner.save();

        // Delete the old image if a new one is uploaded
        if (newImagePath && oldImagePath) await deleteFile(oldImagePath);

        res.status(200).json({ message: "Banner updated successfully.", banner });
    } catch (error) {
        console.log(error)
        if (req.file?.path) await deleteFile(req.file.path);
        res.status(500).json({ message: "Failed to update banner.", error: error.message });
    }
};

const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findById(id);

        if (!banner) {
            return res.status(404).json({ message: "Banner not found." });
        }

        const imagePath = banner.bannerImage;
        await banner.deleteOne();

        // Delete the banner image file
        if (imagePath) await deleteFile(imagePath);

        res.status(200).json({ message: "Banner deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete banner.", error: error.message });
    }
};

module.exports = {
    createBanner,
    getBanners,
    updateBanner,
    deleteBanner,
    getSingleBanners
};
