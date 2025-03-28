const express = require("express");
const router = express.Router();
const SignUpCRUD = require("../models/User");

router.get("/", async (req, res) => {
    try {
        const userId = req.cookies?.User_cookie?.toString();

        if (!userId) {
            return res.status(400).json({ message: "Cookie has not been set!" });
        }

        const userData = await SignUpCRUD.findOne({ _id: userId });

        if (!userData) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json(userData);
    } catch (err) {
        console.error("Error fetching profile data:", err);
        res.status(500).json({ message: "Error fetching profile data", error: err.message });
    }
});

module.exports = router;
