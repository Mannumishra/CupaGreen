const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getProductByName, getAllProductsByCategoryName, getAllProductsBySubCategoryName } = require("../Controllers/ProductController")
const upload = require("../MiddleWares/Multer")

const ProductRouter = require("express").Router()

ProductRouter.post("/create-product", upload.single("productImage"), createProduct)
ProductRouter.get("/get-product", getAllProducts)
ProductRouter.get("/get-product/by-categoryname/:categoryName", getAllProductsByCategoryName)
ProductRouter.get("/get-product/by-subcategoryname/:subcategoryName", getAllProductsBySubCategoryName)
ProductRouter.get("/get-product/:id", getProductById)
ProductRouter.get("/get-product-by-name/:productname", getProductByName)
ProductRouter.put("/update-product/:id", upload.single("productImage"), updateProduct)
ProductRouter.delete("/delete-product/:id", deleteProduct)


module.exports = ProductRouter