const Category = require("../Models/CategoryModel");


// Create a new category
exports.createCategory = async (req, res) => {
    try {
        let { name, cateStatus } = req.body;
        
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        // Convert the category name to uppercase
        name = name.toUpperCase();

        // Check if a category with the same name already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "This category name already exists"
            });
        }

        const category = new Category({ name, cateStatus });
        const savedCategory = await category.save();
        res.status(201).json({ message: "Category created successfully", category: savedCategory });
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error: error.message });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories.reverse());
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Error fetching category", error: error.message });
    }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, cateStatus } = req.body;
        
        if (name) {
            name = name.toUpperCase();
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, { name, cateStatus }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: "Error updating category", error: error.message });
    }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error: error.message });
    }
};
