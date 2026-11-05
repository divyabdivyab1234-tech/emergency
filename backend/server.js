
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

// Connect to MongoDB and start server
const startServer = async () => {

    await connectDB();

    app.get("/api/status", (req, res) => {
        res.status(200).json({
            success: true,
            message: "Smart Emergency Response System is running!",
            status: "Active"
        });
    });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

};

startServer();
