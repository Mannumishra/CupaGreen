const Product = require("../Models/ProductModel");
const { uploadImage, deleteImage } = require("../Utils/Cloudnary");
const fs = require('fs').promises;
const path = require('path');


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



exports.createProduct = async (req, res) => {
    try {
        const { category, subcategory, productName, productSubDetails, productDetails } = req.body;
        const errorMessage = [];

        if (!category || category.trim() === '') errorMessage.push("Category is required");
        if (!subcategory || subcategory.trim() === '') errorMessage.push("Subcategory is required");
        if (!productName || productName.trim() === '') errorMessage.push("Product name is required");
        if (!productSubDetails || productSubDetails.trim() === '') errorMessage.push("Product sub-details are required");
        if (!productDetails || productDetails.trim() === '') errorMessage.push("Product details are required");

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Product Image is required"
            });
        }

        if (errorMessage.length > 0) {
            deleteFile(req.file.path)
            return res.status(400).json({ message: errorMessage.join(", ") });
        }

        const existingProduct = await Product.findOne({ productName });
        if (existingProduct) {
            deleteFile(req.file.path)
            return res.status(400).json({ message: "Product name must be unique" });
        }

        const newProduct = new Product({
            category,
            subcategory,
            productName,
            productSubDetails,
            productDetails,
            productImage: req.file.path
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct); 

    } catch (error) {
        console.error(error);
        if (fs.existsSync(req.file.path)) deleteFile(req.file.path)  
        res.status(500).json({ message: "Error creating product", error });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category") // Populate category name
            .populate("subcategory"); // Populate subcategory name
        if (!products) {
            return res.status(404).json({
                success: false,
                message: "REcord Not Found"
            })
        }
        res.status(200).json(products.reverse());
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products", error });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id)
            .populate("category", "name") // Populate category name
            .populate("subcategory", "name"); // Populate subcategory name
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product", error });
    }
};

exports.getProductByName = async (req, res) => {
    const { productname } = req.params;
    // console.log(productname)
    try {
        const product = await Product.findOne({productName:productname})
            .populate("category", "name") // Populate category name
            .populate("subcategory", "name"); // Populate subcategory name
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product", error });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { category, subcategory, productName, productSubDetails, productDetails } = req.body;
    
    try {
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        let updatedImagePath = existingProduct.productImage;
        
        if (req.file) {
            deleteFile(existingProduct.productImage);
            updatedImagePath = req.file.path;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                category,
                subcategory,
                productName: productName.toUpperCase(),
                productSubDetails,
                productDetails,
                productImage: updatedImagePath,
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: 'Product updated successfully',
            updatedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product", error });
    }
};



exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const productToDelete = await Product.findById(id);
        if (!productToDelete) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (productToDelete.productImage) {
            deleteFile(productToDelete.productImage);
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product", error });
    }
};


