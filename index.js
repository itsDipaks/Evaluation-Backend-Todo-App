const express=require("express")
const { connectdatabasse } = require("./src/config/db")
const { TodoRouter } = require("./src/routes/Todo.route")
const { UserRouter } = require("./src/routes/User.route")
require("dotenv").config()
const cors=require("cors")
const port=process.env.PORT
const app=express()
app.use(cors())
app.use(express.json())
app.use("/auth",UserRouter)
app.use("/todo",TodoRouter)
app.listen(port,async()=>{
    try{
        await connectdatabasse;
        console.log("Contectd To Database")
console.log(`server Started At http://localhost:${port}`)
    }catch(err){
        console.log("Something Wents Wrong",err)
    }
})