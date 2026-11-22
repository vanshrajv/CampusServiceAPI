const Complaint = require("../models/Complaint");
const User = require("../models/User");

// CREATE COMPLAINT
exports.createComplaint = async(req, res) => {
    try {
        const { title, description, category, location, priority } = req.body;

        if (!title || !description || !category || !location) {
            return res.status(400).json({
                message: "All required fields must be filled"
            });
        }

        const complaint = await Complaint.create({
            title,
            description,
            category,
            location,
            priority: priority || "Medium",
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Complaint submitted successfully",
            complaint
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// GET ALL COMPLAINTS / SEARCH / FILTER
exports.getComplaints = async(req, res) => {
    try {
        let filter = {};

        if (req.user.role === "student") {
            filter.createdBy = req.user.id;
        }

        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.priority) {
            filter.priority = req.query.priority;
        }

        if (req.query.search) {
            filter.$or = [
                { title: { $regex: req.query.search, $options: "i" } },
                { description: { $regex: req.query.search, $options: "i" } },
                { location: { $regex: req.query.search, $options: "i" } }
            ];
        }

        const complaints = await Complaint.find(filter)
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email")
            .sort({ createdAt: -1 });

        res.json({
            total: complaints.length,
            complaints
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET SINGLE COMPLAINT
exports.getComplaintById = async(req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id)
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email");

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        if (
            req.user.role === "student" &&
            complaint.createdBy._id.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "You cannot access this complaint"
            });
        }

        res.json(complaint);

    } catch (error) {
        res.status(400).json({
            message: "Invalid complaint ID"
        });
    }
};

// UPDATE COMPLAINT STATUS / ASSIGNMENT
exports.updateComplaint = async(req, res) => {
    try {
        const { status, priority, assignedTo } = req.body;

        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        const transitions = {
            Pending: ["Assigned", "Rejected"],
            Assigned: ["In Progress", "Rejected"],
            "In Progress": ["Resolved", "Rejected"],
            Resolved: [],
            Rejected: []
        };

        if (status && status !== complaint.status) {
            if (!transitions[complaint.status].includes(status)) {
                return res.status(400).json({
                    message: "Invalid status transition"
                });
            }
            complaint.status = status;
        }

        if (priority) {
            complaint.priority = priority;
        }

        if (assignedTo) {
            if (!["Pending", "Assigned"].includes(complaint.status)) {
                return res.status(400).json({
                    message: "Cannot assign a complaint at this stage"
                });
            }

            const admin = await User.findOne({
                _id: assignedTo,
                role: "admin"
            });

            if (!admin) {
                return res.status(400).json({
                    message: "Assigned user must be an admin"
                });
            }

            complaint.assignedTo = admin._id;

            if (complaint.status === "Pending") {
                complaint.status = "Assigned";
            }
        }

        await complaint.save();

        res.json({
            message: "Complaint updated successfully",
            complaint
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// DELETE COMPLAINT
exports.deleteComplaint = async(req, res) => {
    try {
        const complaint = await Complaint.findByIdAndDelete(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        res.json({
            message: "Complaint deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid complaint ID"
        });
    }
};

// ADMIN STATISTICS
exports.getStatistics = async(req, res) => {
    try {
        const total = await Complaint.countDocuments();

        const pending = await Complaint.countDocuments({
            status: "Pending"
        });

        const assigned = await Complaint.countDocuments({
            status: "Assigned"
        });

        const inProgress = await Complaint.countDocuments({
            status: "In Progress"
        });

        const resolved = await Complaint.countDocuments({
            status: "Resolved"
        });

        const rejected = await Complaint.countDocuments({
            status: "Rejected"
        });

        res.json({
            total,
            pending,
            assigned,
            inProgress,
            resolved,
            rejected
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};