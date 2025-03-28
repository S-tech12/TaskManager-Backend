const express = require("express");
const router = express.Router();
const TaskCRUD = require("../models/Task");

router.get("/", async (req, res) => {
    try {
        const userId = req.cookies?.User_cookie?.toString();

        if (!userId) {
            return res.status(401).json({ message: "User not logged in" });
        }

        const tasks = await TaskCRUD.find({ TaskCreater: userId });
        return res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: "Error fetching tasks", error });
    }
});

module.exports = router;
