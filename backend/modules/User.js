const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    id:{type:Number},
    name: { type: String, required: true },
    password: { type: String, required: true }, 
    email: { type: String, required: true}, 
    location: { type: String } 
});

const User = mongoose.model("User", UserSchema);

module.exports = User;