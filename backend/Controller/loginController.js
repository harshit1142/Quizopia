const jwt=require('jsonwebtoken')
const studentModel=require('../Model/studentModel')
const teacherModel=require('../Model/teacherModel')
const adminModel=require('../Model/adminModel')
const bcrypt=require('bcrypt')

const jwtKey=process.env.JWT_KEY;

async function loginUser(req,res){
    const {email,password}=req.body;
    const user1=await studentModel.findOne({email:email}).exec();
    const user2=await teacherModel.findOne({email:email}).exec();
    const user3=await adminModel.findOne({email:email}).exec();
    if(user1)
    {
        const match = await bcrypt.compare(password, user1.password);
        if(match){
            const id=user1['_id']
           const token=jwt.sign({payload:id},jwtKey);
           res.cookie('isLogin',token,{httpOnly:true});
            res.json({
                meassage:"Login successfully",
                data:user1
            })
        }
        else{
            res.send("Invalid Password");
        }
    }
    else if(user2)
    {
        const match = await bcrypt.compare(password, user2.password);
        if(match){
            const id=user2['_id']
           const token=jwt.sign({payload:id},jwtKey);
           res.cookie('isLogin',token,{httpOnly:true});
            res.json({
                meassage:"Login successfully",
                data:user2
            })
        }
        else{
            res.send("Invalid Password");
        }
    }
    else if(user3)
    {
        const match = await bcrypt.compare(password, user3.password);
        if(match){
            const id=user3['_id']
           const token=jwt.sign({payload:id},jwtKey);
           res.cookie('isLogin',token,{httpOnly:true});
            res.json({
                meassage:"Login successfully",
                data:user3
            })
        }
        else{
            res.send("Invalid Password");
        }
    }
    else{
        res.send("Invalid Input");
    }
}

module.exports={loginUser};