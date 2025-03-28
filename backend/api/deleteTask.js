const express = require("express");
const router = express.Router();
const TaskCRUD = require("../models/Task");

router.delete("/:id", async (req, res) => {
    try {
        const userId = req.cookies?.User_cookie?.toString();

        if (!userId) {
            return res.status(401).json({ message: "User not logged in" });
        }

        const taskId = req.params.id;

        const reqToDeleteTask = await TaskCRUD.findOneAndDelete({
            _id: taskId,
            TaskCreater: userId
        });

        if (!reqToDeleteTask) {
            return res.status(404).json({ message: "Task not found or not authorized to delete" });
        }

        return res.json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error("Error deleting task:", err);
        return res.status(500).json({ message: "Error deleting task", error: err });
    }
});

module.exports = router;
