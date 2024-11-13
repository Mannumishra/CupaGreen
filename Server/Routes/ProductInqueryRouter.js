const { createInquiry, getAllInquiries, getInquiryById, updateInquiry, deleteInquiry } = require("../Controllers/ProductInqueryController")

const ProductInqueryRouter = require("express").Router()

ProductInqueryRouter.post("/send-inquery" , createInquiry)
ProductInqueryRouter.get("/get-inquery" , getAllInquiries)
ProductInqueryRouter.get("/get-inquery/:id" , getInquiryById)
ProductInqueryRouter.put("/update-inquery/:id" , updateInquiry)
ProductInqueryRouter.delete("/delete-inquery/:id" , deleteInquiry)

module.exports = ProductInqueryRouter