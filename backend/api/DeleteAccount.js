app.delete("/DeleteAccount", async (req, res) => {
    try {
        const userId = req.cookies.User_cookie;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized! No user found in cookies." });
        }

        // Delete the user account
        const result = await SignUpCRUD.findByIdAndDelete(userId);

        if (!result) {
            return res.status(404).json({ message: "User not found or already deleted." });
        }

        // Delete all tasks related to the user
        await TaskCRUD.deleteMany({ TaskCreater: userId });

        // Clear the user cookie after successful deletion
        res.clearCookie("User_cookie", {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: "Lax"
        });

        return res.status(200).json({ message: "The account and associated tasks have been deleted successfully!" });

    } catch (err) {
        console.error("Error deleting account:", err);
        return res.status(500).json({ message: "Internal server error while deleting account.", error: err.message });
    }
});
