import React from 'react'
import classes from '../Pages/QuizWindow/QuizWindow.module.css'
import { useDispatch } from 'react-redux'
import { updateQues } from '../Redux/QuesRedux';


export default function Question({ele,ind}) {
  const dispatch = useDispatch();


  function handelchange(e){
    const data={
      ind:ind,
      option:e.target.value,
      score:ele.score,
      answer:ele.answer
    }
    dispatch(updateQues(data))
  }

  return (
      <div className={classes.quizheader}>
          <h2 id="question" className='text-light'>{ind+1}{")"} {ele.ques}</h2>
          <h6 className='text-light' >Marks : {ele.score}</h6>
          <select name="option" id="option" onChange={handelchange}>
            <option value="0">Select</option>
            <option value="1">{ele.option1}</option>
            <option value="2">{ele.option2}</option>
            <option value="3">{ele.option3}</option>
            <option value="4">{ele.option4}</option>
          </select>
      </div>
  )
}
