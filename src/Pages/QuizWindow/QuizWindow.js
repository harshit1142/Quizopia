import React from 'react'
import classes from './QuizWindow.module.css'
import { useDispatch, useSelector } from 'react-redux'
import Question from '../../Components/Question';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { removeQues } from '../../Redux/QuesRedux';



export default function QuizWindow() {

   const dispatch=useDispatch();
  const selectUser = (state) => state.rootReducer.UserReducer.user;
  const selectQuiz = (state) => state.rootReducer.QuizReducer.quiz;
  const selectQues= (state) => state.rootReducer.QuesReducer.ques;

  const user= useSelector(selectUser);
  const quiz= useSelector(selectQuiz);
  const ques= useSelector(selectQues);
  
  const question=quiz.question;
  const history=useHistory();
  
  async function handelSubmit(){
    var totalScore=0;
    var score=0;
    for(var i=0;i<ques.length;i++){
      if(ques[i].option===ques[i].answer){
        score+=parseInt(ques[i].score)
      }
      totalScore+=parseInt(ques[i].score)
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
          score:score,
          totalMarks:totalScore,
          quizId:quiz._id,
          studentId:user._id,
        })
      })
      const res = await response.json();
      if(res.status===200){
        dispatch(removeQues({}))
        alert("Quiz Submitted Successfully !!")
        history.push("/student");
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
      </div>
      <div className="progress mt-5 mb-5 w-80">
        <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width:"60%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <div className='box-middle text-primary pt-2 pb-3'>
      <h5 className='text-dark'>Student-Detail</h5>
       <h6>Name : {user.name}</h6>
       <h6>Branch : {user.branch}</h6>
       <h6>Email : {user.email}</h6>
       <h6>Graduation Year : {user.graduationYear}</h6>
      </div>
      <div className='container-fluid p-3 d-flex flex-column bg-dark text-light'>
           {question && question.map((ele,ind)=><Question ele={ele} key={ele._id} ind={ind}/>)}
      </div>
    </div>
    </div>
  )
}
