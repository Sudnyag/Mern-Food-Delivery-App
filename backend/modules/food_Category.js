const mongoose = require('mongoose');

const foodCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true // Ensures each category is unique
    }
});

const FoodCategory = mongoose.model("FoodCategory", foodCategorySchema);
module.exports = FoodCategory;
