import React, { useEffect, useState } from 'react'
import AddQuestion from './AddQuestion';
import { setRanking } from '../Redux/RankingRedux';
import { setQuiz } from '../Redux/QuizRedux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { setChange } from '../Redux/ReloadRedux';
import { socket } from '../App';

export default function QuizList({list,ind,name}) {
  const dispatch=useDispatch();
  const history=useHistory();

  async function handeldelete(){
    const response = await fetch(`http://localhost:4000/quiz/teacher/deleteQuiz/${list._id}`);
    const res = await response.json();
    if(res.status===200){
      socket.emit('quizAdded');
      alert("Deleted");
    } else {
      alert("Error Occured");
    }
  }

  const quizDate = new Date(list.date);
  var [isIdeal, setIdeal] = useState("left");
  var [bg, setbg] = useState("pink");
  var last = new Date(quizDate.getTime() + list.duration * 60000);
//  console.log(quizDate);
  function setShow() {
    var today = new Date();
    if (today.getDate() === quizDate.getDate() && today.getMonth() === quizDate.getMonth() && today.getFullYear() === quizDate.getFullYear()) {
      if (today.getTime() >= quizDate.getTime() && today.getTime() <= last.getTime()) {
        setIdeal("start");
        setbg("green");
      }
      else if (today.getTime() > last.getTime()) {
        setIdeal("over");
        setbg("red")
      }
    }
    else if (today.getMonth() === quizDate.getMonth() && today.getFullYear() === quizDate.getFullYear()) {
      if (today.getDate() > quizDate.getDate()) {
        setIdeal("over");
        setbg("red")
      }
    }
    else if (today.getFullYear() === quizDate.getFullYear()) {
      if (today.getMonth() > quizDate.getMonth()) {
        setIdeal("over");
        setbg("red")
      }
    } else if (today.getFullYear() > quizDate.getFullYear()) {
      setIdeal("over");
      setbg("red")
    }

  }
  useEffect(() => {
    const timer1 = setInterval(() => setShow(), 1000);

    return () => {
      clearTimeout(timer1);
    };


  }, [])
      
    const [control,setControl]=useState("");
     if(control==="add"){
      return (
        <AddQuestion id={list._id} />
      )
     }
  async function handleRanking() {
    const response = await fetch(`http://localhost:4000/leaderBoard/quiz/${list._id}`);
    const res = await response.json();
    dispatch(setRanking(res.data))
    dispatch(setQuiz(list));
    history.push("/ranking");
  }

      return (
        
        <div className="card" style={{ margin: "2px" }}>
          <div className="card-body" style={{backgroundColor:bg}}>
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
              Teacher : {name}
            </h6>
            <div className="d-flex flex-row flex-wrap">
              {isIdeal === "left" ? <button onClick={(e) => setControl("add")} className="btn" style={{ color: "green" }}>Add Ques</button> :""}
              {isIdeal !== "start" ? <button className="btn" style={{ color: "red", background: "black" }} onClick={handeldelete}>Delete</button> :""}  
              {isIdeal === "over" ? <button className="btn" style={{ color: "black", background: "yellow" }} onClick={handleRanking}>Ranking</button> :""}
            </div>
          </div>
        </div>
      );
}
