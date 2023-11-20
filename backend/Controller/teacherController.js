const teacherModel =require("../Model/teacherModel")

async function getTeacher(req,res)
{
    // const token=req.cookies.isAdmin;
    // if(token)
    // {
        try {
                const data=await teacherModel.find({}).exec();
                res.json({
                    message:"Teacher",
                    data:data
                })
                
            } catch (error) {
                console.log(error);
                res.send({message:error});
            }
    // }else{
    //     res.send({message:"Invalid Auth"});
    // }
    
}

async function postTeacher(req,res){
    try {
        const body=req.body;
        const add=await teacherModel.create(body);
        res.json({
            status:201,
            message:"Successfully Done",
            data:add
        })
        
    } catch (error) {
        console.log(error);
        res.send({message:error});
    }
}

async function patchTeacher(req,res){
    const {email}=req.body;
    const userData=await teacherModel.findOneAndUpdate({email:email},{accepted:true});
    res.json({
        message:"Teacher Accepted",
        data:userData
    })

}

async function deleteTeacher(req,res){
     const {email}=req.body;
     const userData=await teacherModel.deleteOne({email:email});
     res.json({
        message:"Teacher Removed...",
        data:userData
     })
}




module.exports={getTeacher,postTeacher,patchTeacher,deleteTeacher};