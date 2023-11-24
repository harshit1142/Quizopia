const express=require("express");

const {getadmin,postadmin,patchadmin,deleteadmin}=require("../Controller/adminController");
const { getNotice, postNotice, getAllNotice } = require("../Controller/adminNoticeController");

const adminRouter=express.Router();



adminRouter
.route("/")
.get(getadmin)
.post(postadmin)
.patch(patchadmin)
.delete(deleteadmin);

adminRouter
.route("/notice/:id")
.get(getNotice)
.post(postNotice)

adminRouter
.route("/notice")
.get(getAllNotice)



module.exports=adminRouter;