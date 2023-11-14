const express=require("express");

const {getStudent,postStudent,patchStudent,deleteStudent}=require("../Controller/studentController")

const studentRoute=express.Router();



studentRoute
.route("/")
.get(getStudent)
.post(postStudent)
.patch(patchStudent)
.delete(deleteStudent);




module.exports=studentRoute;
