const express = require('express');
const router1 = express.Router();
const User = require('./modules/User');

const bodyParser = require('body-parser');

router1.use(bodyParser.urlencoded({ extended: false }));
router1.use(bodyParser.json());
router1.use(bodyParser.raw());


// Create User
router1.post('/createUsers', async (req, res) => {

    const count = await User.countDocuments();
    const Uid = count + 1;
    try {
        const obj = {
            id: Uid,
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            location: req.body.geolocation
        };
        console.log(obj);
        const u1 = new User(obj);
        await u1.save();
        res.status(201).json({
            message: "User created successfully",
            data: obj
        });
    } catch (err) {
        console.error("Error in saving user:", err);
        res.status(500).json({ message: "Error in creating user" });
    }
});

// Get all users
router1.get("/getUsers", async (req, res) => {
    try {
        const result = await User.find({});
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

router1.delete("/removeUser/:Uid", async function (req, res) {
    const Uid = req.params.Uid;
    var result = await User.deleteOne({ id: Uid });
    // res.json(result);
    if (result.deletedCount == 0) {
        res.json({ "status": "not Deleted" });

    }
    else {
        res.json({ "status": "deleted" });
    }
});



module.exports = router1;