const mongoose = require("mongoose");

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error("MONGO_URI is not configured in the .env file.");
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        throw new Error(`MongoDB connection failed: ${error.message}`, { cause: error });
    }
};

module.exports = connectDB;