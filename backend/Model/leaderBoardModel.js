const mongoose = require("mongoose");

const leaderBoardSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    branch: {
        type: String
    },
    graduationYear: {
        type: Number
    },
    quizId:{
        type:String
    },
    studentId:{
        type:String
    },
    score:{
        type:Number
    },
    totalMarks:{
        type:Number
    }
})



const leaderBoardModel = mongoose.model("LeaderBoardModel", leaderBoardSchema);

module.exports = leaderBoardModel;