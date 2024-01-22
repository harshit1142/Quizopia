const express=require("express");

const {getquiz,postquiz,deletequiz, getStudentQuiz, getAllquiz, addQuestion}=require("../Controller/quizController")


const quizRoute=express.Router();




quizRoute
.route("/teacher/:id")
.get(getquiz)
.post(postquiz)

quizRoute
.route("/student/:id")
.get(getStudentQuiz)

quizRoute
.route("/teacher")
.get(getAllquiz)

quizRoute
.route("/teacher/addQuestion/:id")
.post(addQuestion)

quizRoute
.route("/teacher/deleteQuiz/:id")
.get(deletequiz)



module.exports=quizRoute;