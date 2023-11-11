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
      type: Date
    },
    duration : {
      type: Date
    },
    question:[{
        ques:{
            type:String
        },
        option:[String],
        answer:{
            type:String
        },
        score:{
            type:Number
        }
    }]
    
})



const quizModel=mongoose.model("quizModel",quizSchema);

module.exports=quizModel;