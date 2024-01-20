import React from 'react'
import classes from './QuizWindow.module.css'
import { useSelector } from 'react-redux'
import Question from '../../Components/Question';

export default function QuizWindow() {


  const selectUser = (state) => state.rootReducer.UserReducer.user;
  const selectQuiz = (state) => state.rootReducer.QuizReducer.quiz;
  const user= useSelector(selectUser);
  const quiz= useSelector(selectQuiz);
  const question=quiz.question;
  return (
    <div className='container-fluid w-100' >
    <div className='pt-2 bg-light text-dark'>
      <div className='box-top d-flex text-dark flex-column justify-content-center align-items-center'>
      <h1>{quiz.title}</h1>
      <h6 className='text-dark'>Duration : {quiz.duration} min</h6>
      <p className='text-dark'>{quiz.description}</p>
      <button className={classes.button} >Submit</button>
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
           {question.map((ele,ind)=><Question ele={ele} key={ele._id}/>)}
      </div>
    </div>
    </div>
  )
}
