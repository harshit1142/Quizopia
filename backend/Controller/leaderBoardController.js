const { default: mongoose } = require("mongoose");
const leaderBoardModel = require("../Model/leaderBoardModel");


async function getLeaderboard(req,res){
    try {
        
        const quizId=req.params.id;
        const data=await leaderBoardModel.find({quizId:quizId});
        res.json({
         status:200,
         message:"Selected Quiz LeaderBoard",
         data:data
        })
    } catch (error) {
        res.json({
            message:error
        })
    }
}
async function getAllLeaderboard(req,res){
   try {
       
       const data=await leaderBoardModel.find({});
      res.json({
       status:200,
       message:"All Quiz LeaderBoard",
       data:data
      })
   } catch (error) {
      res.json({
        message:error
    })
   }
}

async function postLeaderboard(req,res){
    try {
        const body=req.body;
        const data=await leaderBoardModel.create(body);
        res.json({
         status:200,
         message:"Selected Quiz LeaderBoard",
         data:data
     })
        
    } catch (error) {
        res.json({
            message: error
        })
    }
}

module.exports = { getLeaderboard,postLeaderboard,getAllLeaderboard};