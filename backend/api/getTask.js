const express = require("express");
const router = express.Router();
const TaskCRUD = require("../models/Task");

router.get("/:id", async (req, res) => {
    try {
        const userId = req.cookies?.User_cookie?.toString();
        const taskId = req.params.id;

        if (!userId) {
            return res.status(401).json({ message: "User not logged in" });
        }

        const task = await TaskCRUD.findOne({
            TaskCreater: userId,
            _id: taskId
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ message: "Error fetching task", error });
    }
});

module.exports = router;
