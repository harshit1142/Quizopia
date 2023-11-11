const { default: mongoose } = require("mongoose");
const quizModel =require("../Model/quizModel");
const teacherModel = require("../Model/teacherModel");

async function getquiz(req,res)
{
    const data=await quizModel.find({}).exec();
    res.json({
        message:"Quizes ",
        data:data
    })
}

async function postquiz(req,res){
    const {title,description,branch,graduationYear,date,duration,question,email}=req.body;
    const quiz=await quizModel.create({
        title:title,
        description:description,
        branch:branch,
        graduationYear:graduationYear,
        date:date,
        duration:duration,
        question:question
    })

    const quizId=new mongoose.Types.ObjectId(quiz.id);
    await teacherModel.updateOne({
        email:email
    },{
        $push:{
            quiz:quizId
        }
    }
    )
    res.json({
        message:"Quiz added",
        data:quiz
    })
}

// async function patchquiz(req,res){
//     const {email,name}=req.body;
//     const userData=await quizModel.findOneAndUpdate({email:email},{name:name});
//     res.json({
//         message:"Updated",
//         data:userData
//     })

// }

async function deletequiz(req,res){
     const {email}=req.body;
     const userData=await quizModel.deleteOne({email:email});
     res.json({
        message:"Deleted",
        data:userData
     })
}

async function addQuiz(req,res){
   
}

module.exports={getquiz,postquiz,deletequiz,addQuiz};