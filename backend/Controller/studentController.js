const studentModel =require("../Model/studentModel")

async function getStudent(req,res)
{
    const data=await studentModel.find({}).exec();
    res.json({
        message:"Students",
        data:data
    })
}

async function postStudent(req,res){
    const body=req.body;
    const add=await studentModel.create(body);
    res.json({
        message:"Successfully Done",
        data:add
    })
}

async function patchStudent(req,res){
    const {email,name}=req.body;
    const userData=await studentModel.findOneAndUpdate({email:email},{name:name});
    res.json({
        message:"Updated",
        data:userData
    })

}

async function deleteStudent(req,res){
     const {email}=req.body;
     const userData=await studentModel.deleteOne({email:email});
     res.json({
        message:"Deleted",
        data:userData
     })
}



module.exports={getStudent,postStudent,patchStudent,deleteStudent};