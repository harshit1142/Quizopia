const { default: mongoose } = require("mongoose");
const quizModel =require("../Model/quizModel");
const teacherModel = require("../Model/teacherModel");
const studentModel = require("../Model/studentModel");


//  TEACHER QUIZ 

async function getquiz(req,res){
    try {
        const id= req.params.id;
        const data=await teacherModel.find({_id:id}).populate({path:'quiz',model:'quizModel'});
        res.json({
            message:"All quizes ",
            data:data
        })
        
    } catch (error) {
        res.json({
          message: error,
          data: [],
        });
    }
}

async function getAllquiz(req,res){
    try {
        const data=await teacherModel.find({}).populate({path:'quiz',model:'quizModel'});
        res.json({
            message:"All quizes ",
            data:data
        })
        
    } catch (error) {
        res.json({
          message: error,
          data: []
        });
    }
}



async function postquiz(req,res){
    try {
        
        const id=req.params.id;
        const {title,description,branch,graduationYear,date,duration,question,totalMarks}=req.body;
        const quiz=await quizModel.create({
            title:title,
            description:description,
            branch:branch,
            graduationYear:graduationYear,
            date:date,
            duration:duration,
            question:question,
            totalMarks:totalMarks
        })
        const quizId=new mongoose.Types.ObjectId(quiz.id);
        await teacherModel.updateOne({
            _id:id
        },{
            $push:{
                quiz:quizId
            }
        }
        )
        await studentModel.updateMany({
            branch:branch,
            graduationYear:graduationYear
        },{
             $push:{
                quiz:quizId
            }
        })
        res.json({
          status: 200,
          message: "Quiz added",
          data: quiz,
        });
    } catch (error) {
        res.json({
          message: error,
          data: [],
        });
    }
}

// async function patchquiz(req,res){
//     const {email,name}=req.body;
//     const userData=await quizModel.findOneAndUpdate({email:email},{name:name});
//     res.json({
//         message:"Updated",
//         data:userData
//     })

// }

async function deletequiz(req,res){ // to work later
     const params=req.params.id;
     const userData=await quizModel.find({_id:id}).populate({path:'quiz',model:'quizModel'}).deleteOne({_id:quesID});
     res.json({
        message:"Deleted",
        data:userData
     })
}



//  STUDENT QUIZ

async function getStudentQuiz(req,res)
{
    const id=req.params.id;
    const data=await studentModel.find({_id:id}).populate({path:'quiz',model:'quizModel'});
    res.json({
        message:"All quizes ",
        data:data
    })
}

module.exports={getquiz,postquiz,deletequiz,getStudentQuiz,getAllquiz};