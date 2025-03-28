const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    TaskTitle: {
        type: String,
        required: true
    },
    TaskDescription: {
        type: String
    },
    TaskEndDate: {
        type: String
    },
    TaskDifficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Easy'
    },
    TaskPriority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    TaskCreater: {
        type: String
    }
}, { timestamps: true });

const TaskCRUD = mongoose.model("TaskTable", TaskSchema);

module.exports = TaskCRUD;