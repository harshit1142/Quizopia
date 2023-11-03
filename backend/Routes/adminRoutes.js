const express=require("express");

const {getadmin,postadmin,patchadmin,deleteadmin}=require("../Controller/adminController")

const adminRouter=express.Router();



adminRouter
.route("/")
.get(getadmin)
.post(postadmin)
.patch(patchadmin)
.delete(deleteadmin);


module.exports=adminRouter;