var mongoose=require('mongoose');

var cartSchema=mongoose.Schema({
    cart_id: { type: String, required: true, unique: true },
    items: [
        {
            food_id: { type: Number, required: true },
            food_name: { type: String, required: true },
            quantity: { type: Number, required: true, default: 1 },
            price: { type: Number, required: true },
        },
    ],
    total_price: { type: Number, required: true, default: 0 },

    
});
var Cart=mongoose.model("Cart",cartSchema,"Cart");
module.exports=Cart;