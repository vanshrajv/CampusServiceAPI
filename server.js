const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/complaints", require("./routes/complaintRoutes"));

// Home route
app.get("/", (req, res) => {
    res.send("Campus Service API Running Successfully");
});

// Start server after database connection
const PORT = process.env.PORT || 5000;

const startServer = async() => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured in the .env file.");
    }

    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});