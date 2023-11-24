const { default: mongoose } = require("mongoose");
const adminModel = require("../Model/adminModel");
const adminNotice = require("../Model/adminNoticeModel");

async function getNotice(req,res){
    try {
         const id = req.params.id;
         const data = await adminModel
           .find({ _id: id })
           .populate({ path: "notice", model: "adminNotice" });
         res.json({
           message: "Notices by You ",
           data: data,
         });
    } catch (error) {
        res.json({
            message:error,
            data:[]
        })
    }
  
}
async function getAllNotice(req,res){
    try {
        const data=await adminModel.find({}).populate({path:'notice',model:'adminNotice'});
        res.json({
            message:"All Notices by Admin",
            data:data
        })
        
    } catch (error) {
        res.json({
          message: error,
          data: []
        });
    }
}

async function postNotice(req,res){
    try {
        
        const id=req.params.id;
        const {title}=req.body;
        const notice=await adminNotice.create({
            title:title
        })
        const noticeId=new mongoose.Types.ObjectId(notice.id);
        await adminModel.updateOne({
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
    } catch (error) {
        res.json({
          message: error,
          data: []
        });
    }
}

module.exports={getNotice,postNotice,getAllNotice};