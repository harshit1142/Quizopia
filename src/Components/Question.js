import React from 'react'
import classes from '../Pages/QuizWindow/QuizWindow.module.css'

export default function Question({ele}) {
  return (
      <div className={classes.quizheader}>
          <h2 id="question" className='text-light'>{ele.ques}</h2>
          <h6 className='text-light'>Marks : {ele.score}</h6>
          <ul>
              <li>
                  <input type="radio" id="a" name="answer" className={classes.answer} />
                  <label id="a_text" for="a">{ele.option1}</label>
              </li>
              <li>
                  <input type="radio" id="b" name="answer" className={classes.answer} />
                  <label id="b_text" for="b">{ele.option2}</label>
              </li>
              <li>
                  <input type="radio" id="c" name="answer" className={classes.answer} />
                  <label id="c_text" for="c">{ele.option3}</label>
              </li>
              <li>
                  <input type="radio" id="d" name="answer" className={classes.answer} />
                  <label id="d_text" for="d">{ele.option4}</label>
              </li>
          </ul>
      </div>
  )
}
