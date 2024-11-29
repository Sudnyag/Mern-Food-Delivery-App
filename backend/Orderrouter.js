const express = require("express");
const router = express.Router();
const Order = require('./modules/Orderdata');
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

// Route to handle order data
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });

    let eId = await Order.findOne({ "name": req.body.username });
    console.log(eId);
    if (eId === null) {
        try {
            await Order.create({
                name: req.body.username,
                order_data: [data]
            }).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            console.error("Error creating order:", error.message);
            res.status(500).json({ message: "Server Error", error: error.message });
        }
    } else {
        try {
            eId.order_data.push(data);
            await eId.save();
            res.json({ success: true });
        } catch (error) {
            console.error("Error updating order:", error.message);
            res.status(500).json({ message: "Server Error", error: error.message });
        }
    }
});

// Route to fetch user's order data
router.post('/myorderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ "name": req.body.username });
        res.json({ orderData: myData });
    } catch (error) {
        console.error("Error fetching order data:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;