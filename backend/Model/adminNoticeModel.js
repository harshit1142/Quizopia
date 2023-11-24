const mongoose =require("mongoose");

const adminNoticeSchema= new mongoose.Schema({
    title:{
        type:String
    },
    date:{
        type:String
    }
})

adminNoticeSchema.pre('save',async function(){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' ,hour:'numeric',minute:'numeric',second:'numeric'};
    var today=new Date();
    this.date=today.toLocaleString("en-US",options);
})

const adminNotice=mongoose.model("adminNotice",adminNoticeSchema);

module.exports=adminNotice;