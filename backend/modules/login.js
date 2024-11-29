var mongoose=require('mongoose');
var login=mongoose.Schema({
    username:{type:String},
    userpassword:{type:String},
});
var Login=mongoose.model("login",login,"login");
module.exports=Login;