const mongoose = require("mongoose");

const SignUpSchema = new mongoose.Schema({
    SignUpFullName: {
        type: String,
        required: true,
    },
    SignUpEmail: {
        type: String,
        required: true
    },
    SignUpUsername: {
        type: String,
        required: true,
        unique: true
    },
    SignUpPassword: {
        type: String,
        required: true
    }
});

const SignUpCRUD = mongoose.model("SignUpTable", SignUpSchema);

module.exports = SignUpCRUD;