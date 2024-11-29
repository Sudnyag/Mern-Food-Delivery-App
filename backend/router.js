const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

// Serve static files from /uploads
// Serve static files from /uploads with /foodapp prefix
router.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Set up multer for file uploads
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) => cb(null, `${file.originalname}`)  // Ensuring unique filenames
});
const upload = multer({ storage: storage });

// MongoDB setup

const foodItems = require('./modules/food_items');
const FoodCategory = require('./modules/food_Category');



// Route for uploading food items
router.post("/uploads", upload.single("image"), async function (req, res) {
    try {
        const imgurl = "http://localhost:5000/foodapp/uploads/" + req.file.filename;

        // Calculate a unique food_id
        const count = await foodItems.countDocuments();
        const fid = count + 1;

        // Construct the food item object
        const obj = {
            food_id: fid,
            food_Category: req.body.txtCategory,
            food_name: req.body.txtname,
            food_desc: req.body.txtdesc,
            food_price: req.body.txtprice,  
            food_quantity: req.body.txtquantity,
            food_url: imgurl,
        };

        // Save the food item to the database
        const foodItem = new foodItems(obj);
        await foodItem.save();

        res.status(201).json({
            message: "Food item uploaded successfully",
            data: {
                food_id: fid,
                food_name: req.body.txtname,
                food_Category: req.body.txtCategory,
                food_url: imgurl,
                original_filename: req.file.originalname
            }
        });
    } catch (err) {
        console.error("Error in saving food item:", err);
        res.status(500).json({ message: "Error in saving food item", error: err.message });
    }
});

router.get("/getAll",async function(req,res){
    var result=await foodItems.find({});
    var output=result;
    res.send(output);
});

router.put("/update/:id",async function(req,res){
    var id=req.params.uid;
    var name=req.body.u;
    var result=await user.find({uId:id});
   
   if(result==""){
    res.json({"status":"not found!!"});

}
else{
    result[0].userCity=city;
    var u1=new user(result[0]);
    var output=u1.save();
    if(!output){
        res.json({"status":"not updated!!"})
    }
    else{
         res.json({"status":"updated!!"})
    }
    }
});

router.get("/search/item", async function (req, res) {
    var category = req.query.food_Category;
    try {
        var result = await foodItems.find({ food_Category: category });
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});



router.delete("/removeItem/:uid",async function(req,res){
    var id=req.params.uid;
    var result=await foodItems.deleteOne({food_id:id});
   // res.json(result);
    if(result.deletedCount==0){
        res.json({"status":"not Deleted"});

    }
    else{
        res.json({"status":"deleted"});
    }
});

module.exports = router;
