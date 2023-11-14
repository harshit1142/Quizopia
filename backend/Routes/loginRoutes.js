const express=require("express");


const {loginUser}=require("../Controller/loginController")
const loginRoutes=express.Router();


loginRoutes
.route("/")
.post(loginUser)



module.exports=loginRoutes;