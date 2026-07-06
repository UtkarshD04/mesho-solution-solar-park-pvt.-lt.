const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoutes = require("./routes/user.routes");
const formsRoutes = require("./routes/forms.routes");

const app = express();

const cors = require("cors");

app.use(cors({
    origin: [
        "https://mmyzo.com",
        "https://www.mmyzo.com"
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

module.exports = app;
