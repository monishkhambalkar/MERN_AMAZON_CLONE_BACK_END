// Importing necessary modules
const express = require("express");
const helmet = require("helmet");
const globalErrorHandler = require("./src/ADMIN/middlewares/globalErrorHandler");
const fileUpload = require("express-fileupload");
const config = require("./src/ADMIN/config/config");
const connectDB = require("./src/ADMIN/config/db");
const XLSX = require("xlsx");
const cors = require("cors");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const sanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

// Creating an instance of Express app
const app = express();

app.use(helmet());

// Manage rate limit
let limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "We have received to many Request try after some time",
});

app.use("/ADMIN/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.use(sanitize());
app.use(xss());

// connect DB
connectDB();

// PORT

const PORT = config.port || 3000;

// user cors
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// FOR BODY PARSER
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// --- START DEFINING ROUTES -----

//START ADMIN SIDE API/ROUTES
const adminCategoryRoute = require("./src/ADMIN/routes/category");
const adminSubCategoryRoute = require("./src/ADMIN/routes/subCategory");
const adminProductRoute = require("./src/ADMIN/routes/product");
const adminUserRoute = require("./src/ADMIN/routes/user");
const adminUserSetting = require("./src/ADMIN/routes/userSetting");

app.use("/ADMIN/api/category", adminCategoryRoute);
app.use("/ADMIN/api/subCategory", adminSubCategoryRoute);
app.use("/ADMIN/api/product", adminProductRoute);
app.use("/ADMIN/api/user", adminUserRoute);
app.use("/ADMIN/api/user-setting", adminUserSetting);

//START CUSTOMER SIDE API/ROUTES

// User Management
const customerSignIn = require("./src/CLIENT/routes/userRoutes");
app.use("/CLIENT/api/user", customerSignIn);

// Shopping
const customerWishList = require("./src/CLIENT/routes/shoppingRoutes");
app.use("/CLIENT/api/shopping", customerWishList);

// for initial route
app.get("/", (req, res, next) => {
  res.json({ message: "welcome to admin server" });
});

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server`,
    404
  );
  next(err);
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// bulk product file uploading

// app.use(fileUpload());

// app.post("/upload", (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).json({ message: "No files were uploaded" });
//   }

//   const excelFile = req.files.excelFile;

//   const workBook = XLSX.read(excelFile.data, { type: "buffer" });
//   const sheetName = workBook.SheetNames[0];
//   const sheet = workBook.Sheets[sheetName];
//   const data = XLSX.utils.sheet_to_json(sheet);

//   console.log("Uploaded Excel data:", data);

//   res.json({ message: "File uploaded successfully." });
// });
