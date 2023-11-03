const teacherModel =require("../Model/teacherModel")

async function getTeacher(req,res)
{
    const data=await teacherModel.find({}).exec();
    res.json({
        message:"Students",
        data:data
    })
}

async function postTeacher(req,res){
    const body=req.body;
    const add=await teacherModel.create(body);
    res.json({
        message:"Successfully Done",
        data:add
    })
}

async function patchTeacher(req,res){
    const {email,name}=req.body;
    const userData=await teacherModel.findOneAndUpdate({email:email},{name:name});
    res.json({
        message:"Updated",
        data:userData
    })

}

async function deleteTeacher(req,res){
     const {email}=req.body;
     const userData=await teacherModel.deleteOne({email:email});
     res.json({
        message:"Deleted",
        data:userData
     })
}



module.exports={getTeacher,postTeacher,patchTeacher,deleteTeacher};