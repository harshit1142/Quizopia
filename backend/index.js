const express=require("express");
const app=express();
const DB=require('./db');
app.use(express.json());
const cookies = require("cookie-parser");

app.use(cookies());

app.listen(4000,()=>{
    console.log("App Started on port 4000");
})
DB();

const studentRouter=require('./Routes/studentRoutes');
const teacherRoutes=require('./Routes/teacherRoutes');
const adminRoutes=require('./Routes/adminRoutes');
const loginRoutes=require('./Routes/loginRoutes');
const quizRoute = require("./Routes/quizRoutes");


app.use("/student",studentRouter);
app.use("/quiz",quizRoute);
app.use("/teacher",teacherRoutes);
app.use("/admin",adminRoutes);
app.use("/login",adminRoutes);



// app.use("",(req,res)=>res.sendFile("/404.html",{root:__dirname}))