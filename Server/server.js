const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const { ConnectDb } = require("./DB/ConnectDatabase")
const CategoryRouter = require("./Routes/CategoryRoutes")
const cors = require("cors")
const SubcategoryRouter = require("./Routes/subcategoryRoutes")
const ProductRouter = require("./Routes/ProductRoutes")
const ProductInqueryRouter = require("./Routes/ProductInqueryRouter")
const ContactRouter = require("./Routes/ContactRouter")
const BannerRouter = require("./Routes/BannerRouter")

const app = express()
// // CORS Configuration
// const corsOptions = {
//     origin: ["http://localhost:3001", "https://www.api.cupagreen.com"],
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
// };
// app.use(cors(corsOptions));
app.use(cors())
app.use(express.json())

app.set(express.static("./Public"))
app.use("/Public", express.static("Public"));

app.get("/", (req, res) => {
    res.send(`Server is Running at ${process.env.PORT}`)
})


app.use("/api", CategoryRouter)
app.use("/api", SubcategoryRouter)
app.use("/api", ProductRouter)
app.use("/api", ProductInqueryRouter)
app.use("/api", ContactRouter)
app.use("/api", BannerRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server Is Running At ${process.env.PORT}`)
})

ConnectDb()