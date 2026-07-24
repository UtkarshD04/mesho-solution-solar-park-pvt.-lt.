const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoutes = require("./routes/user.routes");
const formsRoutes = require("./routes/forms.routes");
const adminRoutes = require("./routes/admin.routes");
const productRoutes = require("./routes/product.routes");

const app = express();
const isProduction = process.env.NODE_ENV === "production";



app.use(cors({
    origin: [
        "https://mmyzo.com",
        "https://www.mmyzo.com",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:8000"
    ],
    credentials: true
}));
app.disable("x-powered-by");
app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    if (isProduction) res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    next();
});
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());

// Serve uploaded invoice images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => res.send("Solar Park API running"));
app.use("/users", userRoutes);
app.use("/api/forms", formsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

app.use((err, req, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") return res.status(413).json({ message: "File must be 5 MB or smaller." });
    if (err.message === "Only image files are allowed (jpeg, jpg, png, webp)" || err.message === "Only image files allowed.") {
        return res.status(400).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: "Unexpected server error." });
});

module.exports = app;
