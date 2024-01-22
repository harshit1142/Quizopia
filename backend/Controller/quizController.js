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
        const {title,description,branch,graduationYear,date,duration,question,totalMarks,name}=req.body;
        const quiz=await quizModel.create({
            title:title,
            description:description,
            branch:branch,
            graduationYear:graduationYear,
            date:date,
            duration:duration,
            question:question,
            totalMarks:totalMarks,
            name:name
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
    try {
        
        const id=req.params.id;
       const quizId = new mongoose.Types.ObjectId(id);
        const userData=await quizModel.deleteOne({_id:id});
        const studentQuiz=await studentModel.updateMany({},{
           $pull:{
               quiz:quizId
           }
        });
        const teacherQuiz=await teacherModel.updateMany({},{
           $pull:{
               quiz:quizId
           }
        });
        res.json({
           status:200,
           message:"Deleted",
           data:userData,studentQuiz,teacherQuiz
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
}



//  STUDENT QUIZ

async function getStudentQuiz(req,res)
{
    try {
        
        const id=req.params.id;
        const data=await studentModel.find({_id:id}).populate({path:'quiz',model:'quizModel'});
        res.json({
            message:"All quizes ",
            data:data
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
}

async function addQuestion(req,res){
    try {
        const id = req.params.id;
        const { ques, option1, option2, option3, option4, answer, score, questionType} = req.body;
        const question={
               ques:ques,
               option1:option1,
               option2:option2,
               option3:option3,
               option4:option4,
               answer:answer,
               score:score,
               questionType:questionType
        }
        await quizModel.updateOne({
            _id:id
        }, {
            $push: {
                question:question
            }
        })
        res.json({
            status: 200,
            message: "Question added",
            data: question,
        });
        
    } catch (error) {
        res.json({
            message: error
        })
    }
}

// async function setAttemptQuiz(req,res){
//     try {
        
//         const {studentId,quizId} = req.body;
//         var quiz=await quizModel.find({_id:quizId});
//         quiz[0].attempt=true;
//         const data = await studentModel.findByIdAndDelete({ _id: studentId },{quiz:quiz._id})
//         res.json({
//             message: "Attempted",
//             data: data,quiz
//         })
//     } catch (error) {
//         res.json({
//             message: error
//         })
        
//     }
// }



module.exports={getquiz,postquiz,deletequiz,getStudentQuiz,getAllquiz,addQuestion};