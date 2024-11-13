const ProductInquiry = require("../Models/ProductInqueryModel");

// Create a new product inquiry
exports.createInquiry = async (req, res) => {
    const { productId, name, email, subject, query ,phone } = req.body;

    // Check if required fields are missing
    if (!productId || !name || !email || !subject || !query || !phone) {
        return res.status(400).json({ message: 'All fields are required: productId, name, email, phone, subject, query.' });
    }

    try {
        const newInquiry = new ProductInquiry({
            productId,
            name,
            email,
            subject,
            query,
            phone
        });

        const savedInquiry = await newInquiry.save();
        res.status(201).json(savedInquiry);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ errors: validationErrors });
        }

        res.status(500).json({ message: error.message });
    }
};



// Get all product inquiries
exports.getAllInquiries = async (req, res) => {
    try {
        const inquiries = await ProductInquiry.find().populate("productId");
        res.status(200).json(inquiries.reverse());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a single product inquiry by ID
exports.getInquiryById = async (req, res) => {
    try {
        const inquiry = await ProductInquiry.findById(req.params.id).populate("productId");
        if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
        res.status(200).json(inquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateInquiry = async (req, res) => {
    const { productId, name, email, subject, query ,phone ,inquiryStatus } = req.body;

    // // Validate required fields
    // if (!productId || !name || !email || !subject || !query || !phone) {
    //     return res.status(400).json({ message: 'All fields are required: productId, name, email, subject, query.' });
    // }

    try {
        const updatedInquiry = await ProductInquiry.findByIdAndUpdate(
            req.params.id,
            {
                productId,
                name,
                email,
                subject,
                query,
                phone,
                inquiryStatus
            },
            { new: true }
        );

        if (!updatedInquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }

        res.status(200).json(updatedInquiry);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ errors: validationErrors });
        }
        res.status(500).json({ message: error.message });
    }
};


// Delete a product inquiry by ID
exports.deleteInquiry = async (req, res) => {
    try {
        const deletedInquiry = await ProductInquiry.findByIdAndDelete(req.params.id);
        if (!deletedInquiry) return res.status(404).json({ message: "Inquiry not found" });
        res.status(200).json({ message: "Inquiry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


