import React, { useEffect, useState } from 'react'
import classes from './QuizWindow.module.css'
import { useDispatch, useSelector } from 'react-redux'
import Question from '../../Components/Question';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { removeQues } from '../../Redux/QuesRedux';
import { removeQuiz } from '../../Redux/QuizRedux';
import { socket } from '../../App';



export default function QuizWindow() {

  const dispatch = useDispatch();
  const selectUser = (state) => state.rootReducer.UserReducer.user;
  const selectQuiz = (state) => state.rootReducer.QuizReducer.quiz;
  const selectQues = (state) => state.rootReducer.QuesReducer.ques;

  const user = useSelector(selectUser);
  const quiz = useSelector(selectQuiz);
  const ques = useSelector(selectQues);

  const question = quiz.question;
  const history = useHistory();

  const quizDate = new Date(quiz.date);
  var deadline = new Date(quizDate.getTime() + quiz.duration * 60000);

  const [width, setWidth] = useState(100);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [bg, setbg] = useState("green");

  
  const getTime = () => {
    var time = deadline - (new Date().getTime());
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
    var percentage = (((minutes*60)+seconds )/ (quiz.duration*60))*100;
    setWidth(percentage);
   if(width>=50 && width<=90){
    setbg("orange")
   }
   if(width>=90){
    setbg("red")
   }
    if (width >= 0.100 && width <= 2.900) {
      alert("Time Over !!!")
      return
    }
  };

  useEffect(() => {
    var interval;
    if (!(hours===0  && minutes===0 && seconds===1)) {
     interval = setInterval(() => getTime(), 1000);
    }

    if (hours === 0 && minutes === 0 && seconds === 1) {
      alert("Time Over !!!");
      handelSubmit();
      return () => clearInterval(interval);
    }

  }, [getTime]);
 
  

  async function handelSubmit() {
    if(user.name==="" || quiz._id===""){
      alert("Invalid Input");
      return
    }
    var totalScore = 0;
    var score = 0;
    for (var i = 0; i < ques.length; i++) {
      if (ques[i].option === ques[i].answer) {
        score += parseInt(ques[i].score)
      }
      totalScore += parseInt(ques[i].score)
    }
    try {

      const response = await fetch(`http://localhost:4000/leaderBoard/quiz/${quiz._id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          branch: user.branch,
          graduationYear: user.graduationYear,
          score: score,
          totalMarks: totalScore,
          quizId: quiz._id,
          studentId: user._id,
        })
      })
      const res = await response.json();
      if (res.status === 200) {
        dispatch(removeQues({}))
        dispatch(removeQuiz({}))
        history.push("/student");
        alert("Quiz Submitted Successfully !!")
      } else {
        alert("Error Occured");
      }
    } catch (error) {
      alert(error)
    }
  }

  
  

  return (
    <div className='container-fluid w-100' >
      <div className='pt-2 bg-light text-dark'>
        <div className='box-top d-flex text-dark flex-column justify-content-center align-items-center'>
          <h1>{quiz.title}</h1>
          <h6 className='text-dark'>Duration : {quiz.duration} min</h6>
          <p className='text-dark'>{quiz.description}</p>
          <button className={classes.button} onClick={handelSubmit}>Submit</button>
          <div className={classes.timer} role="timer">
            <div className={classes.col-3}>
              <div className={classes.box}>
                <p id="hour">{hours < 10 ? "0" + hours : hours}</p>
                <span className={classes.text}>Hours</span>
              </div>
            </div>
            <div className={classes.col-3}>
              <div className={classes.box}>
                <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
                <span className={classes.text}>Minutes</span>
              </div>
            </div>
            <div className={classes.col-3}>
              <div className={classes.box}>
                <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
                <span className={classes.text}>Seconds</span>
              </div>
            </div>
          </div>
        </div>
        <div className="progress mt-5 mb-5 w-80">
          <div className="progress-bar progress" role="progressbar" style={{ width: `${width}%` ,background:bg}}  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div className='box-middle text-primary pt-2 pb-3'>
          <h5 className='text-dark'>Student-Detail</h5>
          <h6>Name : {user.name}</h6>
          <h6>Branch : {user.branch}</h6>
          <h6>Email : {user.email}</h6>
          <h6>Graduation Year : {user.graduationYear}</h6>
        </div>
        <div className='container-fluid p-3 d-flex flex-column bg-dark text-light'>
          {question && question.map((ele, ind) => <Question ele={ele} key={ele._id} ind={ind} />)}
        </div>
      </div>
    </div>
  )
}
