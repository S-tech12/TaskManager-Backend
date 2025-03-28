const express = require("express");
const router = express.Router();
const TaskCRUD = require("../models/TaskCRUD"); // Adjust the path if needed

router.get("/", async (req, res) => {
    try {
        const userId = req.cookies.User_cookie?.toString();

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user ID found" });
        }

        // Fetch tasks where the difficulty is "Medium" and created by the logged-in user
        const tasks = await TaskCRUD.find({
            TaskCreater: userId,
            TaskDifficulty: "Medium"
        });

        console.log(tasks); // Logs tasks to the console
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error getting tasks!", error: err.message });
    }
});

module.exports = router;
