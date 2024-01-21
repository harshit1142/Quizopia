const mongoose =require("mongoose");
const bcrypt =require('bcrypt');

const quizSchema= new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    branch:{
      type: String
    },
    graduationYear:{
      type: Number
    },
    date: {
      type: String
    },
    duration : {
      type: String
    },
    question:[{
        ques:{
        type: String,
        require: true
        },
        option1:String,
        option2:String,
        option3:String,
        option4:String,
        answer:{
          type: String,
          require: true
        },
        score:{
          type: Number,
          require: true
        },
        questionType:String
    }],
    attempt:{
      type:Boolean,
      default:false
    },
    totalMarks:{
      type:Number
    },
    marks:{
      type:Number,
      default:0
    },
    name:{
      type:String
    }
    
})

quizSchema.pre("save",async function(){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' ,hour:'numeric',minute:'numeric',second:'numeric'};
    var today=new Date(this.date);
    this.date=today.toLocaleString("en-US");
    
})

const quizModel=mongoose.model("quizModel",quizSchema);

module.exports=quizModel;