const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoutes = require("./routes/user.routes");
const formsRoutes = require("./routes/forms.routes");
const adminRoutes = require("./routes/admin.routes");
const productRoutes = require("./routes/product.routes");

const app = express();



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
app.use(express.json());
app.use(cookieParser());

// Serve uploaded invoice images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => res.send("Solar Park API running"));
app.use("/users", userRoutes);
app.use("/api/forms", formsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
