const express = require("express");
const router = express.Router();
const SignUpCRUD = require("../models/SignUpCRUD"); // Adjust the path if needed

router.put("/", async (req, res) => {
    try {
        const userId = req.cookies.User_cookie?.toString();

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user ID found" });
        }

        const { editFullName, editEmail, editUsername, editPassword } = req.body;

        // Check if the username or email is already in use by another user
        const existingUserName = await SignUpCRUD.findOne({ SignUpUsername: editUsername, _id: { $ne: userId } });
        const checkEmailId = await SignUpCRUD.findOne({ SignUpEmail: editEmail, _id: { $ne: userId } });

        if (existingUserName) {
            return res.status(400).json({ message: "USERNAME ALREADY USED! PLEASE CHOOSE A UNIQUE ONE." });
        }

        if (checkEmailId) {
            return res.status(400).json({ message: "EMAIL ALREADY USED! PLEASE CHOOSE A DIFFERENT ONE." });
        }

        // Update user profile
        const updatedProfile = {
            SignUpFullName: editFullName,
            SignUpEmail: editEmail,
            SignUpUsername: editUsername,
            SignUpPassword: editPassword
        };

        const result = await SignUpCRUD.findByIdAndUpdate(
            userId,
            updatedProfile,
            { new: true }
        );

        if (result) {
            res.json({ message: "Profile updated successfully", updatedProfile: result });
        } else {
            res.status(404).json({ message: "User not found!" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating profile!", error: err.message });
    }
});

module.exports = router;
