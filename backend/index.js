const express=require("express");
const app=express();
const DB=require('./db');
app.use(express.json());
const cookies = require("cookie-parser");
const cors = require("cors");

app.use(cookies());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));



app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    })
app.listen(4000,()=>{
    console.log("App Started on port 4000");
})
DB();

const studentRouter=require('./Routes/studentRoutes');
const teacherRoutes=require('./Routes/teacherRoutes');
const adminRoutes=require('./Routes/adminRoutes');
const loginRoutes=require('./Routes/loginRoutes');
const quizRoute = require("./Routes/quizRoutes");
const leaderBoardRoute = require("./Routes/leaderBoardRoutes");


app.use("/login",loginRoutes);
app.use("/student",studentRouter);
app.use("/teacher",teacherRoutes);
app.use("/admin",adminRoutes);
app.use("/quiz",quizRoute);
app.use("/leaderBoard",leaderBoardRoute);





 function protectStudent(req,res,next){
    try {
        const token=req.cookies.isStudent;
        if(token){
           next();
        }else{
           res.send({message:"Invaild Auth"});
        }
        
    } catch (error) {
        res.send(message=error.message);
    }
}

async function protectTeacher(req,res,next){
    try {
        const token=req.cookies.isTeacher;
        if(token){
           next();
        }else{
           res.send(message="Invalid Auth");
        }
        
    } catch (error) {
        res.send(message=error.message);
    }
}

async function protectAdmin(req,res,next){
    try {
      const token=req.cookies.isAdmin;
      console.log(token);
        if(token){
           next();
        }else{
           res.send(message="Invalid Auth");
        }
        
    } catch (error) {
        res.send(message=error);
    }
}