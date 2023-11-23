const teacherModel =require("../Model/teacherModel")

async function getTeacher(req,res)
{
    // const token=req.cookies.isAdmin;
    // console.log(req.cookies);
    // if(token)
    // {
        // console.log(req);
        // console.log(localStorage.getItem("user"));
        try {
                const data=await teacherModel.find({}).exec();
                res.json({
                    message:"Teacher",
                    data:data
                })
                
            } catch (error) {
                console.log(error);
                res.json({message:error});
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
async function addTeacher(req,res){
    try {
        const id=req.params.id;
        const add=await teacherModel.findOneAndUpdate({_id:id},{accepted:true});
        res.json({
            status:201,
            message:"Teacher Added !!!",
            data:add
        })
        
    } catch (error) {
        console.log(error);
        res.send({message:error});
    }
}
async function removeTeacher(req,res){
    try {
        const id=req.params.id;
        const add=await teacherModel.findByIdAndUpdate({_id:id},{accepted:false});
        res.json({
            status:201,
            message:"Teacher Removed !!!",
            data:add
        })
        
    } catch (error) {
        console.log(error);
        res.send({message:error});
    }
}
async function deleteTeacher(req,res){
    try {
        const id=req.params.id.toString();
         teacherModel.findByIdAndRemove({_id:id}, (err)=>{
            if(err)
            {
                res.send({message:err});

            }else{
                res.json({
                status:201,
                message:"Teacher Deleted !!!",
                data:add
                })
            }
         });
        
        
    } catch (error) {
        console.log(error);
        
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




module.exports={getTeacher,postTeacher,patchTeacher,deleteTeacher,addTeacher,removeTeacher,deleteTeacher};