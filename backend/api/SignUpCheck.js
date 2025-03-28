const express = require("express");
const router = express.Router();
const SignUpCRUD = require("../models/User");

router.post("/", async (req, res) => {
    try {
        let { FullName, UserEmail, UserName, Password1 } = req.body;

        const existingUser = await SignUpCRUD.findOne({
            SignUpUsername: UserName,
            SignUpPassword: Password1
        });

        const existingUserName = await SignUpCRUD.findOne({ SignUpUsername: UserName });
        const checkEmailId = await SignUpCRUD.findOne({ SignUpEmail: UserEmail });

        if (checkEmailId) {
            return res.status(400).json({ message: "EMAIL ALREADY USED!!" });
        }

        if (existingUser) {
            return res.status(400).json({ message: "USER ALREADY EXIST !!" });
        } else if (existingUserName) {
            return res.status(400).json({ message: "USERNAME ALREADY USED MAKE UNIQUE !!" });
        } else {
            const SignUpInstance = new SignUpCRUD({
                SignUpFullName: FullName,
                SignUpUsername: UserName,
                SignUpPassword: Password1,
                SignUpEmail: UserEmail
            });

            const result = await SignUpInstance.save();
            if (result) {
                return res.status(200).json({ message: "ACCOUNT HAS BEEN CREATED!!" });
            }
        }
    } catch (err) {
        console.log("ERROR : " + err);
        return res.status(500).json({ message: "SERVER ERROR!" });
    }
});

module.exports = router;
