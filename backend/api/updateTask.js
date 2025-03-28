const express = require("express");
const router = express.Router();
const TaskCRUD = require("../models/Task");

router.put("/:id", async (req, res) => {
    try {
        const userId = req.cookies?.User_cookie?.toString();
        const _id = req.params.id;
        const updatedTask = req.body;

        if (!userId) {
            return res.status(401).json({ message: "User not logged in" });
        }

        // Check if the new title already exists (excluding the current task)
        const checkExistingTitle = await TaskCRUD.findOne({
            TaskTitle: updatedTask.TaskTitle,
            TaskCreater: userId,
            _id: { $ne: _id }  // Exclude the current task
        });

        if (checkExistingTitle) {
            return res.status(400).json({ message: "THE TITLE OF THE TASK HAS BEEN USED, PLEASE ENTER ANOTHER ONE!!!" });
        }

        const result = await TaskCRUD.findByIdAndUpdate(
            _id,
            updatedTask,
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Task not found or not authorized" });
        }

        res.json({ message: "Task updated successfully", task: result });
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ message: "Error updating tasks!!", ErrorMessage: err.message });
    }
});

module.exports = router;
