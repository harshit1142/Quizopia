const express = require("express");
const app = express();
const DB = require('./db');
const cookies = require("cookie-parser");
// const cors = require("cors");

app.use(express.json());
app.use(cookies());

const { createServer } = require('node:http');
const server = createServer(app);
const { Server } = require('socket.io');


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
// app.listen(4000, () => {
//     console.log("App Started on port 4000");
// })

// const corsOptions = {
    //     origin: 'http://localhost:3000',
    //     credentials: true,            //access-control-allow-credentials:true
    //     optionSuccessStatus: 200,
    // }
    
    // app.use(cors({
//        origin: 'http://localhost:3000'
// }))

const io = new Server(server,{
    cors: {
        origin: '*',
    }
});


server.listen(4000, () => {
    console.log("App Started on port 4000");
});

DB();
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected ' + socket.id);
    });
    socket.on('noticeAdded',()=>{
        io.emit('refreshNotice');
    })
    socket.on('quizAdded',()=>{
        io.emit('refreshQuiz');
    })
    socket.on('addedAdminNotice',()=>{
        io.emit('refreshAdminNotice');
    })
    socket.on('newUser',()=>{
        io.emit('refreshUser');
    })
    socket.on('updateLeaderboard',()=>{
        io.emit('refreshLeaderboard');
    })
    socket.on('adminAction',()=>{
        io.emit('refreshAdminAction');
    })


});



const studentRouter = require('./Routes/studentRoutes');
const teacherRoutes = require('./Routes/teacherRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const loginRoutes = require('./Routes/loginRoutes');
const quizRoute = require("./Routes/quizRoutes");
const leaderBoardRoute = require("./Routes/leaderBoardRoutes");

app.use("/login", loginRoutes);
app.use("/student", studentRouter);
app.use("/teacher", teacherRoutes);
app.use("/admin", adminRoutes);
app.use("/quiz", quizRoute);
app.use("/leaderBoard", leaderBoardRoute);

function protectStudent(req, res, next) {
    try {
        const token = req.cookies.isStudent;
        if (token) {
            next();
        } else {
            res.send({ message: "Invalid Auth" });
        }
    } catch (error) {
        res.send({ message: error.message });
    }
}

async function protectTeacher(req, res, next) {
    try {
        const token = req.cookies.isTeacher;
        if (token) {
            next();
        } else {
            res.send({ message: "Invalid Auth" });
        }
    } catch (error) {
        res.send({ message: error.message });
    }
}

async function protectAdmin(req, res, next) {
    try {
        const token = req.cookies.isAdmin;
        if (token) {
            next();
        } else {
            res.send({ message: "Invalid Auth" });
        }
    } catch (error) {
        res.send({ message: error.message });
    }
}

