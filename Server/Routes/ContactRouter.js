const { createInquiry, getAllInquiries, getInquiryById, updateInquiry, deleteInquiry } = require("../Controllers/ContactController")

const ContactRouter = require("express").Router()

ContactRouter.post("/send-contact-inquery" , createInquiry)
ContactRouter.get("/get-contact-inquery" , getAllInquiries)
ContactRouter.get("/get-contact-inquery/:id" , getInquiryById)
ContactRouter.put("/update-contact-inquery/:id" , updateInquiry)
ContactRouter.delete("/delete-contact-inquery/:id" , deleteInquiry)

module.exports = ContactRouter