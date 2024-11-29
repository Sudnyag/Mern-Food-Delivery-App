const express = require("express");
const router = express.Router();
const User = require("./modules/User");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { username, userpassword } = req.body;

        // Find user by username
        const user = await User.findOne({ name: username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Verify password directly
        if (userpassword !== user.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Login successful
        res.status(200).json({
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error during login", error: error.message });
    }
});



module.exports = router;