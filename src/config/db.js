const mongoose=require("mongoose")
require("dotenv").config()



const connectdatabasse=mongoose.connect(process.env.MONGO_URL)

module.exports={connectdatabasse}