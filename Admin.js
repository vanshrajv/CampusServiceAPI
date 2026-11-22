require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const email = "admin@campus.com";

        const exists = await User.findOne({ email });

        if (exists) {
            console.log("Admin already exists");
            return;
        }

        const password = await bcrypt.hash("Admin@123", 10);

        await User.create({
            name: "Campus Admin",
            email,
            password,
            role: "admin"
        });

        console.log("Admin created successfully");

    } catch (error) {
        console.log(error.message);
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();