const mongoose=require("mongoose");
 const { Schema } = mongoose;
 const OrderSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true

    },
    order_data:{
        type:Array,
        required:true
    }
 });

 const Orderdata=mongoose.model("Orderdata",OrderSchema,"Orderdata");
 module.exports=Orderdata;