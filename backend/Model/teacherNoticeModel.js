const mongoose =require("mongoose");

const teacherNoticeSchema= new mongoose.Schema({
    title:{
        type:String
    },
    branch:{
        type:String
    },
    year:{
        type:Number
    },
    date:{
        type:Date,
        default:new Date().getDate()
    }
})

const teacherNotice=mongoose.model("teacherNotice",teacherNoticeSchema);

module.exports=teacherNotice;
