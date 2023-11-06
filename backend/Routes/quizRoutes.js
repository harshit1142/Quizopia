const express=require("express");

const {getquiz,postquiz,deletequiz}=require("../Controller/quizController")


const quizRoute=express.Router();



quizRoute
.route("/")
.get(getquiz)
.post(postquiz)
.delete(deletequiz);


module.exports=quizRoute;