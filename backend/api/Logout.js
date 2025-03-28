app.post("/Logout", async (req, res) => {
    try {
        res.clearCookie("User_cookie", {
            httpOnly: true,
            secure: false, // Change to true in production
            sameSite: "Lax"
        });

        return res.status(200).json({ message: "User logged out successfully!" });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ message: "Error logging out!" });
    }
});
