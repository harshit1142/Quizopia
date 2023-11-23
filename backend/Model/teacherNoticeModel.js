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
        type:String
    }
})

teacherNoticeSchema.pre('save',async function(){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' ,hour:'numeric',minute:'numeric',second:'numeric'};
    var today=new Date();
    this.date=today.toLocaleString("en-US",options);
})

const teacherNotice=mongoose.model("teacherNotice",teacherNoticeSchema);

module.exports=teacherNotice;
