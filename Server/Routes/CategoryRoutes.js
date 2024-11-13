const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require("../Controllers/CategoryController")

const CategoryRouter = require("express").Router()

CategoryRouter.post("/create-category", createCategory)
CategoryRouter.get("/get-category", getAllCategories)
CategoryRouter.get("/get-category/:id", getCategoryById)
CategoryRouter.put("/update-category/:id", updateCategory)
CategoryRouter.delete("/delete-category/:id", deleteCategory)


module.exports = CategoryRouter