const Category = require("../Models/CategoryModel");
const SubCategory = require("../Models/SubCategoryModel");

// Controller to create a new subcategory
exports.createSubCategory = async (req, res) => {
    try {
        const { name, categoryId, subCateStatus } = req.body;
        console.log(req.body)
        if (!name) {
            return res.status(400).json({ message: "Subcategory name is required" });
        }
        if (!categoryId) {
            return res.status(400).json({ message: "Category ID is required" });
        }
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        const upperCaseName = name.toUpperCase();
        const existingSubCategory = await SubCategory.findOne({
            name: upperCaseName
        });
        if (existingSubCategory) {
            return res.status(400).json({ message: "The subcategory name already exists in this category" });
        }
        const subCategory = new SubCategory({
            name: upperCaseName,
            category: categoryId,
            subCateStatus: subCateStatus || "False"
        });
        await subCategory.save();
        res.status(201).json({ message: "Subcategory created successfully", subCategory });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating subcategory", error });
    }
};

// Controller to fetch all subcategories with their associated categories
exports.getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate("category", "name cateStatus");
        res.status(200).json(subCategories.reverse());
    } catch (error) {
        res.status(500).json({ message: "Error fetching subcategories", error });
    }
};

// Controller to fetch all subcategories with their associated categories
exports.getAllSubCategoriesByCategoryName = async (req, res) => {
    try {
        const { categoryName } = req.params;
        const subCategories = await SubCategory.find().populate("category", "name cateStatus");
        const filterData = subCategories.filter((x) =>
            x.category.name.trim().toLowerCase() === categoryName.trim().toLowerCase()
        );
        res.status(200).json(filterData.reverse());
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        res.status(500).json({ message: "Error fetching subcategories", error });
    }
};


exports.getSubCategoryById = async (req, res) => {
    const { id } = req.params; // Get the subcategory ID from the request params
    try {
        // Find subcategory by ID and populate category with only 'name' and 'cateStatus'
        const subCategory = await SubCategory.findById(id).populate("category", "name cateStatus");

        if (!subCategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        res.status(200).json(subCategory); // Send the found subcategory with category details
    } catch (error) {
        res.status(500).json({ message: "Error fetching subcategory", error });
    }
};

// Controller to update an existing subcategory
exports.updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, categoryId, subCateStatus } = req.body;
        console.log(req.body)

        // Check if name and categoryId are provided for update
        if (!name) {
            return res.status(400).json({ message: "Subcategory name is required" });
        }
        if (!categoryId) {
            return res.status(400).json({ message: "Category ID is required" });
        }

        // Check if the referenced category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Convert the subcategory name to uppercase
        const upperCaseName = name.toUpperCase();

        // Find and update the subcategory
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            id,
            { name: upperCaseName, category: categoryId, subCateStatus: subCateStatus || "False" },
            { new: true }
        );

        if (!updatedSubCategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        res.status(200).json({ message: "Subcategory updated successfully", updatedSubCategory });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error updating subcategory", error });
    }
};

// Controller to delete a subcategory
exports.deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSubCategory = await SubCategory.findByIdAndDelete(id);
        if (!deletedSubCategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        res.status(200).json({ message: "Subcategory deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting subcategory", error });
    }
};
