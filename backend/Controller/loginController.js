const jwt=require('jsonwebtoken')
const studentModel=require('../Model/studentModel')
const teacherModel=require('../Model/teacherModel')
const adminModel=require('../Model/adminModel')
const bcrypt=require('bcrypt')
const dotenv=require('dotenv');
dotenv.config({path: '../.env'});
const jwtKey=process.env.JWT_KEY;

async function loginUser(req,res){
    const {role,email,password}=req.body;
    if(role==="student")
    {
        const user1=await studentModel.findOne({email:email}).exec();
        if(user1)
        {
            const match = await bcrypt.compare(password, user1.password);
            if(match){
                const id=user1['_id']
                const token=jwt.sign({payload:id},jwtKey);
                const expirationTime = new Date(new Date().getTime() + 600000);
               res.cookie('isStudent',token,{httpOnly:true,expirationTime:expirationTime});
               
            //    localStorage.setItem("role", "Student");
                res.json({
                    status:200,
                    meassage:"Login successfully",
                    data:user1
                })
            }
            else{
                res.json({meassage:"Invalid Password"});
            }
        }
        else{
             res.json({meassage:"Invalid Email"});
        }
    }
    else if(role==="teacher")
    {
        const user2=await teacherModel.findOne({email:email}).exec();
        if(user2)
        {
            const match = await bcrypt.compare(password, user2.password);
            if(match){
                const id=user2['_id']
                const token=jwt.sign({payload:id},jwtKey);
              const expirationTime = new Date(new Date().getTime() + 600000);
               res.cookie('isTeacher',token,{httpOnly:true,expirationTime:expirationTime});
                // localStorage.setItem("role", "Teacher");
                res.json({
                    status:200,
                    meassage:"Login successfully",
                    data:user2
                })
            }
            else{
                 res.json({meassage:"Invalid Password"});
            }
        }
        else{
             res.json({meassage:"Invalid Email"});
        }
    }
    else if(role==="admin")
    {
        try {
            
            const user3=await adminModel.findOne({email:email}).exec();
            if(user3)
            {
            const match = await bcrypt.compare(password, user3.password);
            if(match){
                const id=user3['_id']
               const token=jwt.sign({payload:id},jwtKey);
               const expirationTime =(new Date()+ 6000000);
               res.cookie("isAdmin",token,{httpOnly:true,expire:expirationTime});
                // localStorage.setItem("role", "Admin");
                res.json({
                    cookie:token,
                    status:200,
                    meassage:"Login successfully",
                    data:user3
                })
            }
            else{
                 res.json({meassage:"Invalid Password"});
            }
           }else{
             res.json({meassage:"Invalid Email"});
           }
        } catch (error) {
            res.json({
              message: error,
              data: [],
            });
        }
    }
    else{
         res.json({meassage:"Invalid Input"});

    }
}

module.exports={loginUser};