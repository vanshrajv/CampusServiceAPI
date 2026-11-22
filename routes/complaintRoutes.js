const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const controller = require("../controllers/complaintController");

// Student creates complaint
router.post(
    "/",
    auth,
    role("student"),
    controller.createComplaint
);

// Admin statistics (keep before /:id)
router.get(
    "/stats",
    auth,
    role("admin"),
    controller.getStatistics
);

// Get all complaints with filters
router.get(
    "/",
    auth,
    controller.getComplaints
);

// Get single complaint
router.get(
    "/:id",
    auth,
    controller.getComplaintById
);

// Admin updates complaint
router.put(
    "/:id",
    auth,
    role("admin"),
    controller.updateComplaint
);

// Admin deletes complaint
router.delete(
    "/:id",
    auth,
    role("admin"),
    controller.deleteComplaint
);

module.exports = router;