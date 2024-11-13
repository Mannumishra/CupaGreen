const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dsimn9z1r',   // Replace with your cloud name
    api_key: '589299526244464',         // Replace with your API key
    api_secret: 'szZztXT7MLE6k4Zdenm3heEPFLQ',   // Replace with your API secret
});

// Upload image function
const uploadImage = async (filePath, folder = 'product_images') => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { folder });
        return result.secure_url
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};

const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary delete result:", result); // Log Cloudinary response
        if (result.result === 'ok') {
            return 'Image deleted successfully';
        } else {
            throw new Error('Error deleting image from Cloudinary');
        }
    } catch (error) {
        throw new Error('Error deleting image: ' + error.message);
    }
};

module.exports = {
    uploadImage,
    deleteImage,
};
