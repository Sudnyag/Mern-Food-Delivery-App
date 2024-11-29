var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var Hotel = require('./modules/Hotel');  // Importing the Hotel model

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer setup
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) => cb(null, `${file.originalname}`)  // Ensuring unique filenames
});
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
    res.send("It's the home page");
});

router.post("/uploads", upload.single("image"), async function (req, res) {
    try {
        const hotelurl = `http://localhost:5000/foodapp/hotels/uploads/${req.file.filename}`;

        // Calculate a unique hotel_id
        const count = await Hotel.countDocuments();
        const hotel_id = count + 1;

        // Construct the hotel object
        const obj = {
            hotel_id: hotel_id,
            hotel_name: req.body.txtname,
            hotel_desc: req.body.txtdesc,
            hotel_address: req.body.txtaddress,
            hotel_url: hotelurl,
        };

        // Save the hotel information to the database
        const newHotel = new Hotel(obj);
        await newHotel.save();

        res.status(201).json({
            message: "Hotel uploaded successfully",
            data: {
                hotel_id: hotel_id,
                hotel_name: req.body.txtname,
                hotel_desc: req.body.txtdesc,
                hotel_address: req.body.txtaddress,
                hotel_url: hotelurl,
                original_filename: req.file.originalname
            }
        });
    } catch (err) {
        console.error("Error in saving hotel:", err);
        res.status(500).json({ message: "Error in hotel upload", error: err.message });
    }
});

router.get("/gethotels",async function(req,res){
    var result=await Hotel.find({});
    var output=result;
    res.send(output);
});

router.delete("/removehotel/:uid",async function(req,res){
    var id=req.params.uid;
    var result=await Hotel.deleteOne({hotel_id:id});
   // res.json(result);
    if(result.deletedCount==0){
        res.json({"status":"not Deleted"});

    }
    else{
        res.json({"status":"deleted"});
    }
});


module.exports = router;
