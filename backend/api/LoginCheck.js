const express = require("express");
const router = express.Router();
const SignUpCRUD = require("../models/User");

router.post("/", async (req, res) => {
    try {
        let { Username, Password } = req.body;

        const UserCheck = await SignUpCRUD.findOne({ SignUpUsername: Username });

        if (!UserCheck) {
            return res.status(400).json({ message: "NO ACCOUNT or USERNAME FOUND, PLEASE SIGN UP FIRST!!" });
        }

        if (UserCheck.SignUpPassword !== Password) {
            return res.status(400).json({ message: "WRONG PASSWORD!!" });
        }

        res.cookie("User_cookie", UserCheck._id.toString(), {
            httpOnly: true,   // Prevent access from JavaScript (for security)
            secure: false,    // Set to true in production (only send on HTTPS)
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            sameSite: "Lax"   // Helps with CORS
        });

        return res.status(200).json({ message: "LOGIN SUCCESSFULLY!!", User_cookie: UserCheck._id });
    } catch (err) {
        console.log("ERROR : " + err);
        return res.status(500).json({ message: "SERVER ERROR!" });
    }
});

module.exports = router;
