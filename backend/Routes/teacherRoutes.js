const express=require("express");

const {getTeacher,postTeacher,patchTeacher,deleteTeacher}=require("../Controller/teacherController")

const teacherRoute=express.Router();



teacherRoute
.route("/")
.get(getTeacher)
.post(postTeacher)


.patch(patchTeacher)
.delete(deleteTeacher);


// teacherRoute
// .route("/:id")
// .get(getQuiz)




module.exports=teacherRoute;