const express=require("express");

const {getquiz,postquiz,deletequiz, getStudentQuiz}=require("../Controller/quizController")


const quizRoute=express.Router();




quizRoute
.route("/teacher/:id")
.get(getquiz)
.post(postquiz)
.delete(deletequiz);

quizRoute
.route("/student/:id")
.get(getStudentQuiz)

module.exports=quizRoute;