const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://divyeshbhakhar021:divyesh123@cluster0.1rmtwvp.mongodb.net/ecommerces")
        .then(()=>{
            console.log("connected to mongodb");
        })
        .catch((error)=>{
            console.log("not connected to mongodb", error);
        })
    } catch (error) {
        
    }
}

module.exports = connectDB;
