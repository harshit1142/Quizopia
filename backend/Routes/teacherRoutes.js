const express=require("express");

const {getTeacher,patchTeacher,deleteTeacher, postTeacher}=require("../Controller/teacherController");
const { getNotice, postNotice, getAllNotice } = require("../Controller/teacherNoticeController");

const teacherRoute=express.Router();



teacherRoute
.route("/")
.get(getTeacher)
.post(postTeacher)
.patch(patchTeacher)
.delete(deleteTeacher);


teacherRoute
.route("/notice/")
.get(getAllNotice)

teacherRoute
.route("/notice/:id")
.get(getNotice)
.post(postNotice)




module.exports=teacherRoute;