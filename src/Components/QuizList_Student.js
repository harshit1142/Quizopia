import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { setQuiz } from '../Redux/QuizRedux';
import { setRanking } from '../Redux/RankingRedux';
import { socket } from '../App';


export default function QuizList_Student({ list, ind, name }) {
 const history=useHistory();
  const dispatch=useDispatch();
    const selectUser = (state) => state.rootReducer.UserReducer.user;
    const selectQuiz = (state) => state.rootReducer.QuizReducer.quiz;
    const selectRank = (state) => state.rootReducer.RankingReducer.rank;
    const ranking=useSelector(selectRank);
    const user=useSelector(selectUser);
    const quiz=useSelector(selectQuiz);
    
    var [isIdeal,setIdeal]=useState("left");
    var [bg,setbg]=useState("pink");
    const attempt=ranking.filter((ele,ind)=>ele.studentId===user._id && ele.quizId===list._id);
    var isAttempt=(attempt.length>=1)?true:false; 
    // console.log(attempt);
    const quizDate = new Date(list.date);
    var last=new Date(quizDate.getTime() + list.duration * 60000);
//    console.log(ranking);
    function setShow(){
        var today=new Date();
        if (today.getDate() === quizDate.getDate() && today.getMonth() === quizDate.getMonth() && today.getFullYear() === quizDate.getFullYear()){
            if (today.getTime() >= quizDate.getTime() && today.getTime() <= last.getTime()){
                setIdeal("start");
                setbg("green");
            }
            else if (today.getTime() > last.getTime()){
                setIdeal("over");
                setbg("red");
            }
        }
        else if (today.getMonth() === quizDate.getMonth() && today.getFullYear() === quizDate.getFullYear()){
            if(today.getDate()>quizDate.getDate()){
                setIdeal("over");
                setbg("red")
            }
        }
        else if (today.getFullYear() === quizDate.getFullYear()){
            if (today.getMonth() >quizDate.getMonth()){
                setIdeal("over");
                setbg("red")
            }
        } else if (today.getFullYear() > quizDate.getFullYear()){
            setIdeal("over");
            setbg("red")
        }
        
    }
    useEffect(()=>{
        const timer1 = setInterval(() => setShow(),1000);
        // console.log(ind+" "+isIdeal+" "+isAttempt);
       
        return () => {
            clearTimeout(timer1);
        };
        
        
    },[])


 
  function handleStart(){
       dispatch(setQuiz(list));
       alert("Quiz Started !!")
       history.push("/quiz");
    }
    async function handleRank(){
        const response = await fetch(`http://localhost:4000/leaderBoard/quiz/${list._id}`);
        const res = await response.json();
        dispatch(setRanking(res.data))
        dispatch(setQuiz(list));
        history.push("/ranking");
  }

    
    return (

        <div className="card" style={{ margin: "2px" }}>
            <div className="card-body" style={{ backgroundColor: bg }}>
                <h5 className="card-title" style={{ color: "black" }}>
                    {list.title}
                </h5>
                <h6
                    className="card-subtitle mb-2 text-muted"
                    style={{ color: "black" }}
                >
                    {list.description}
                </h6>
                <p className="card-text " style={{ color: "red" }}>
                    Marks :{list.totalMarks}
                </p>
                <h6
                    className="card-subtitle mb-2 text-muted"
                    style={{ color: "black" }}
                >
                    {list.date}
                </h6>
                <h6
                    className="card-subtitle mb-2 text-muted"
                    style={{ color: "black" }}
                >
                    {list.duration} min
                </h6>
                <h5 className="card-title" style={{ color: "black" }}>
                    {list.branch},{list.graduationYear}
                </h5>
                <h6
                    className="card-subtitle mb-2 text-muted"
                    style={{ color: "black" }}
                >
                    Teacher : {list.name}
                </h6>
                <div className="d-flex flex-column">
                    {/* {style==="green"?<h1>Upcoming Quiz</h1>:<h1>Quiz Completed</h1>} */}
                    {isIdeal==="start" && isAttempt === false ? <button className="btn btn-primary m-2" onClick={handleStart} >Start</button> :""}
                    {isIdeal==="over" && isAttempt ? <button className="btn btn-warning m-2" onClick={handleRank}>Ranking</button>:""}
                    {isIdeal === "left" ? <button className="btn btn-warning m-2 p-2" disabled >Pending</button>:"" }
                    
                </div>
            </div>
        </div>
    );
}
