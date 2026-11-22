const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: ["Electrical", "Internet", "Cleaning", "Water", "Other"],
        required: true
    },

    location: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "Assigned", "In Progress", "Resolved", "Rejected"],
        default: "Pending"
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }

}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);