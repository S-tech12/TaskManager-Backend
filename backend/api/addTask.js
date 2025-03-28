const express = require("express");
const router = express.Router();
const TaskCRUD = require("../models/Task");

router.post("/", async (req, res) => {
    const { Task_Title, Task_Description, TitleEndDate, Task_Difficulty, Task_Priority } = req.body;

    const userId = req.cookies?.User_cookie?.toString();

    if (!userId) {
        return res.status(401).json({ message: "User not logged in" });
    }

    try {
        const checkExistingTitle = await TaskCRUD.findOne({
            TaskTitle: Task_Title,
            TaskCreater: userId
        });

        if (checkExistingTitle) {
            return res.status(400).json({ message: "THE TITLE OF THE TASK HAS BEEN USED. PLEASE ENTER ANOTHER ONE!" });
        }

        const newTask = new TaskCRUD({
            TaskTitle: Task_Title,
            TaskDescription: Task_Description,
            TaskEndDate: TitleEndDate,
            TaskDifficulty: Task_Difficulty,
            TaskPriority: Task_Priority,
            TaskCreater: userId
        });

        await newTask.save();
        return res.status(201).json({ message: "THE NEW TASK HAS BEEN CREATED SUCCESSFULLY!" });

    } catch (err) {
        console.error("Error creating task:", err);
        return res.status(500).json({ message: "THERE IS AN ERROR CREATING THE TASK", error: err });
    }
});

module.exports = router;
