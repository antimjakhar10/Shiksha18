const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const streamRoutes = require("./routes/streamRoutes");
const courseRoutes = require("./routes/courseRoutes");
const facilityRoutes = require("./routes/facilityRoutes");
const placementRoutes = require("./routes/placementRoutes");
const bloguserRoutes = require("./routes/bloguserRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const savedRoutes = require("./routes/savedRoutes");
const siteUserRoutes = require("./routes/siteUserRoutes");
const megaMenuRoutes = require("./routes/megamenuRoutes");

const multer = require("multer");
const path = require("path");

const app = express();



const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://collegechale.com",
  "https://www.collegechale.com",
  "http://shiksha18.com",
  "https://shiksha18.com",
  "http://www.shiksha18.com",
  "https://www.shiksha18.com" 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CollegeChale Backend Running 🚀");
});

const storage = multer.diskStorage({
destination:"uploads/",
filename:(req,file,cb)=>{
cb(null,Date.now()+path.extname(file.originalname));
}
});

const upload = multer({storage});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/upload", upload.single("image"), (req,res)=>{

res.json({
image:`/uploads/${req.file.filename}`
});

});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/colleges", require("./routes/collegeRoutes"));
app.use("/api/enquiries", require("./routes/enquiryRoutes"));
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs",blogRoutes);
app.use("/api/streams",streamRoutes);
app.use("/api/courses",courseRoutes);
app.use("/api/facilities",facilityRoutes);
app.use("/api/placements",placementRoutes);
app.use("/api/bloguser",bloguserRoutes);
app.use("/api/contact",contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/saved",savedRoutes);
app.use("/api/siteusers",siteUserRoutes);
app.use("/api/megamenu",megaMenuRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});