const express = require('express');
const router = express.Router();
const Cart = require('./modules/Cart'); // Mongoose model for Cart
const Items = require('./modules/food_items'); // Mongoose model for Food Items
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Route to create a new cart
router.post('/createCart', async (req, res) => {
    try {
        // Create a new cart object
        const newCart = new Cart({
            cart_id: req.body.cart_id , // Unique cart ID, use Date.now() as fallback
            items: [] // Start with an empty cart
        });

        // Save the cart to the database
        await newCart.save();

        res.status(201).json({
            message: "Cart created successfully",
            cart: newCart
        });
    } catch (error) {
        console.error("Error creating cart:", error);
        res.status(500).json({ message: "Failed to create cart", error: error.message });
    }
});

// Route to add an item to the cart
router.post('/addItemToCart/:cartId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const { food_id, quantity } = req.body;  // Get food_id and quantity from the request body
        
        // Find the cart by its cart_id
        const cart = await Cart.findOne({ cart_id: cartId });
        
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the food item by its food_id
        const foodItem = await Items.findOne({ food_id: food_id });

        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }

        // Check if the item already exists in the cart
        const existingItemIndex = cart.items.findIndex(item => item.item.toString() === foodItem._id.toString());

        if (existingItemIndex !== -1) {
            // If the item already exists, update the quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // If the item doesn't exist in the cart, add it as a new item
            cart.items.push({
                item: foodItem._id,
                quantity: quantity
            });
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json({
            message: "Item added to cart successfully",
            cart: cart
        });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ message: "Failed to add item to cart", error: error.message });
    }
});


// Route to get a cart by its ID
router.get("/getCart/:cartId", async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const cart = await Cart.findOne({ cart_id: cartId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Failed to fetch cart", error: error.message });
    }
});

// Route to remove a cart by its ID
router.delete("/removeCart/:cartId", async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const result = await Cart.deleteOne({ cart_id: cartId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Cart not found or already deleted" });
        }

        res.status(200).json({ message: "Cart removed successfully" });
    } catch (error) {
        console.error("Error removing cart:", error);
        res.status(500).json({ message: "Failed to remove cart", error: error.message });
    }
});

// Export the router
module.exports = router;
