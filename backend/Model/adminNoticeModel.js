const mongoose =require("mongoose");

const adminNoticeSchema= new mongoose.Schema({
    title:{
        type:String
    },
    date:{
        type:Date,
        default:new Date().getDate()
    }
})

const adminNotice=mongoose.model("adminNotice",adminNoticeSchema);

module.exports=adminNotice;