const mongoose =require("mongoose");

const teacherNoticeSchema= new mongoose.Schema({
    title:{
        type:String
    },
    date:{
        type:Date,
        default:new Date().getDate()
    }
})

const teacherNotice=mongoose.model("teacherNotice",teacherNoticeSchema);

module.exports=teacherNotice;
