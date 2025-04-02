const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://task-manager-frontend-one-beta.vercel.app/', // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // If using cookies or authentication
}));

mongoose.connect("mongodb+srv://smitpipalva:A5uCOpGoTLsYFr45@cluster0.exilunf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


// Import API Routes
// have aapne je badhi files banaie chie tene aapne ahiya import karai devani che
const SignUpCheckRoute = require("./api/SignUpCheck");
const LoginCheckRoute = require("./api/LoginCheck");
const AddTaskRoute = require("./api/addTask");
const GetTasksRoute = require("./api/getTasks");
const DeleteTaskRoute = require("./api/deleteTask");
const GetTaskRoute = require("./api/getTask"); 
const UpdateTaskRoute = require("./api/updateTask");
const GetProfileDataRoute = require("./api/getProfileData"); 
const LogoutRoute = require("./api/Logout"); 
const DeleteAccountRoute = require("./api/DeleteAccount");
const UpdateProfileRoute = require("./api/updateProfileData");
const GetEasyTasksRoute = require("./api/EasyTasks");
const GetMediumTasksRoute = require("./api/MediumTasks");
const GetHardTasksRoute = require("./api/HardTasks");
const GetLowPriorityTasksRoute = require("./api/LowPriorityTasks");
const GetMediumPriorityTasksRoute = require("./api/MediumPriorityTasks");
const GetHighPriorityTasksRoute = require("./api/HighPriorityTasks");

// Use Routes
// have je route ne aapne import karayela che tene aapne ahiya aavi rite use karvana che.
app.use("/api/SignUpCheck", SignUpCheckRoute);
app.use("/api/LoginCheck", LoginCheckRoute);
app.use("/api/addTask", AddTaskRoute);
app.use("/api/getTasks", GetTasksRoute);
app.use("/api/deleteTask", DeleteTaskRoute);
app.use("/api/getTask", GetTaskRoute); 
app.use("/api/updateTask", UpdateTaskRoute); 
app.use("/api/getProfileData", GetProfileDataRoute);
app.use("/api/Logout", LogoutRoute);
app.use("/api/DeleteAccount", DeleteAccountRoute);
app.use("/api/updateProfileData", UpdateProfileRoute);
app.use("/api/EasyTasks", GetEasyTasksRoute);
app.use("/api/MediumTasks", GetMediumTasksRoute);
app.use("/api/HardTasks", GetHardTasksRoute);
app.use("/api/LowPriorityTasks", GetLowPriorityTasksRoute);
app.use("/api/MediumPriorityTasks", GetMediumPriorityTasksRoute);
app.use("/api/HighPriorityTasks", GetHighPriorityTasksRoute);

module.exports = app;
