const express=require("express");

const {getquiz,postquiz,deletequiz, getStudentQuiz, getAllquiz}=require("../Controller/quizController")


const quizRoute=express.Router();




quizRoute
.route("/teacher/:id")
.get(getquiz)
.post(postquiz)
.delete(deletequiz);

quizRoute
.route("/student/:id")
.get(getStudentQuiz)

quizRoute
.route("/teacher")
.get(getAllquiz)

module.exports=quizRoute;