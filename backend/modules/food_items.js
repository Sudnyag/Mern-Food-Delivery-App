const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    food_id: { type: Number, unique: true, required: true },  
    food_Category: { type: String, required: true },
    food_name: { type: String, required: true },
    food_desc: { type: String },
    food_price: { type: Number, required: true },
    food_url: { type: String },
    food_quantity: {type:Number}
});

const FoodItem = mongoose.model("FoodItem", FoodSchema, "foodItems");
module.exports = FoodItem;
