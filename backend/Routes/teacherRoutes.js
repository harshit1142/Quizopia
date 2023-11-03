const express=require("express");

const {getTeacher,postTeacher,patchTeacher,deleteTeacher}=require("../Controller/teacherController")

const teacherRoute=express.Router();



teacherRoute
.route("/")
.get(getTeacher)
.post(postTeacher)
.patch(patchTeacher)
.delete(deleteTeacher);


module.exports=teacherRoute;