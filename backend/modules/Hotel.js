var mongoose=require('mongoose');
var hotel=mongoose.Schema({
    hotel_id:{type:Number },
    hotel_name:{type:String},
    hotel_desc:{type:String},
    hotel_address:{type:String},
    hotel_url:{type:String}
});
var Hotel=mongoose.model("Hotel",hotel);
module.exports=Hotel;