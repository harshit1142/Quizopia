const express = require("express");
const { getLeaderboard, postLeaderboard, getAllLeaderboard } = require("../Controller/leaderBoardController");



const leaderBoardRoute = express.Router();




leaderBoardRoute
    .route("/quiz/:id")
    .get(getLeaderboard)
    .post(postLeaderboard)
    
leaderBoardRoute
    .route("/quiz")
    .get(getAllLeaderboard)





module.exports = leaderBoardRoute;