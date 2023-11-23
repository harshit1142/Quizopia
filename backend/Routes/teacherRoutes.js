const express=require("express");

const {getTeacher,patchTeacher,deleteTeacher, postTeacher, addTeacher, removeTeacher}=require("../Controller/teacherController");
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

teacherRoute
.route("/add/:id")
.get(addTeacher);

teacherRoute
.route("/remove/:id")
.get(removeTeacher);

teacherRoute
.route("/delete/:id")
.get(deleteTeacher);





module.exports=teacherRoute;