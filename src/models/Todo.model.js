const mongoose=require("mongoose")

const TodoSchema=new mongoose.Schema({
    taskname:{type:String,required:true},
    status :{type:String,required:true,default:"pending",enum:["pending","done"]},
    tag:{type:String,required:true,default:"personal",enum:["personal","official","family"]},
    user_id:{type:String,required:true}
})

const TodoModel=mongoose.model("Todo",TodoSchema)

module.exports={TodoModel}