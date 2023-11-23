const { default: mongoose } = require("mongoose");
const teacherModel = require("../Model/teacherModel");
const teacherNotice = require("../Model/teacherNoticeModel");

async function getNotice(req,res){
    const id= req.params.id;
    const data=await teacherModel.find({_id:id}).populate({path:'notice',model:'teacherNotice'});
    res.json({
        message:"Notices by You ",
        data:data
    })
}
async function getAllNotice(req,res){
    const data=await teacherModel.find({}).populate({path:'notice',model:'teacherNotice'});
    res.json({
        message:"All Notices by Teacher ",
        data:data
    })
}

async function postNotice(req,res){
    const id=req.params.id;
    const {title,year,branch}=req.body;
    const notice=await teacherNotice.create({
        title:title,
        year:year,
        branch:branch
    })
    const noticeId=new mongoose.Types.ObjectId(notice.id);
    await teacherModel.updateOne({
        _id:id
    },{
        $push:{
            notice:noticeId
        }
    }
    )
    res.status(201).json({
        status:201,
        message:"Notice added",
        data:notice
    })
}


module.exports={getNotice,postNotice,getAllNotice};