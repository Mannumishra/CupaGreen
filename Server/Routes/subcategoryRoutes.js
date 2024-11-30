const express = require("express");
const { createSubCategory, getAllSubCategories, updateSubCategory, deleteSubCategory, getSubCategoryById, getAllSubCategoriesByCategoryName } = require("../Controllers/subcategoryController");
const SubcategoryRouter = express.Router();

SubcategoryRouter.post("/create-subcategories", createSubCategory);
SubcategoryRouter.get("/get-subcategories", getAllSubCategories);
SubcategoryRouter.get("/get-subcategories/by-categoryname/:categoryName", getAllSubCategoriesByCategoryName);
SubcategoryRouter.get("/get-subcategories/:id", getSubCategoryById);
SubcategoryRouter.put("/update-subcategories/:id", updateSubCategory);
SubcategoryRouter.delete("/delete-subcategories/:id", deleteSubCategory);

module.exports = SubcategoryRouter;
