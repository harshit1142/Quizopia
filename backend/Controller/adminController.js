const adminModel =require("../Model/adminModel")

async function getadmin(req,res)
{
    const data=await adminModel.find({}).exec();
    res.json({
        message:"Students",
        data:data
    })
}

async function postadmin(req,res){
    const body=req.body;
    const add=await adminModel.create(body);
    res.json({
        message:"Successfully Done",
        data:add
    })
}

async function patchadmin(req,res){
    const {email,name}=req.body;
    const userData=await adminModel.findOneAndUpdate({email:email},{name:name});
    res.json({
        message:"Updated",
        data:userData
    })

}

async function deleteadmin(req,res){
     const {email}=req.body;
     const userData=await adminModel.deleteOne({email:email});
     res.json({
        message:"Deleted",
        data:userData
     })
}



module.exports={getadmin,postadmin,patchadmin,deleteadmin};