import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setChange } from '../Redux/ReloadRedux';
import { socket } from '../App';


export default function AddQuestion({id}) {
  const dispatch=useDispatch();
 
    const [ques,setQues]=useState({
        ques:"",
        option1:"",
        option2:"",
        option3:"",
        option4:"",
        answer:"",
        score:""
    })
    function handelChange(e){
      setQues({...ques,[e.target.name]:e.target.value})
    }
    async function handelAdd(e){
      e.preventDefault();
      if (ques.ques === "" || ques.answer === "0" || ques.score === "" || ques.answer === "" ){
        alert("Invalid Input")
        return 
      }
      const response = await fetch(
       `http://localhost:4000/quiz/teacher/addQuestion/${id}`,
       {
         method: "POST",
         headers: {
           "content-type": "application/json",
         },
         body: JSON.stringify({
           ques:ques.ques,
           option1:ques.option1,
           option2:ques.option2,
           option3:ques.option3,
           option4:ques.option4,
           answer:ques.answer,
           score: ques.score
         }),
       }
     );
                const res= await response.json();
                if(res.status===200)
                {
                  alert("Added Successfully!!");
                  setQues({
                    ques:"",
                    option1:"",
                    option2:"",
                    option3:"",
                    option4:"",
                    answer:"",
                    score:""
                  })
                  socket.emit('quizAdded');
                  
                }else{
                    alert("Error Occured");
                }
    }

  return (
    <div className='d-flex flex-column'>
          <textarea type="text" value={ques.ques} name='ques' onChange={handelChange} placeholder='Question' required/>
          <textarea type="text" value={ques.option1}  name='option1'  onChange={handelChange} placeholder='Option 1' required/>
          <textarea type="text" value={ques.option2} name='option2'  onChange={handelChange} placeholder='Option 2' required/>
          <textarea type="text" value={ques.option3} name='option3'  onChange={handelChange} placeholder='Option 3' required/>
          <textarea type="text" value={ques.option4}  name='option4' onChange={handelChange} placeholder='Option 4' required/>
          <select name="answer" id="answer" value={ques.answer} onChange={handelChange} placeholder='Correct Option' required>
            <option value="0">Select Answer</option>
            <option value="1">1 Option</option>
            <option value="2">2 Option</option>
            <option value="3">3 Option</option>
            <option value="4">4 Option</option>
          </select>
      <input type="text" placeholder='Marks' name='score' value={ques.score}  onChange={handelChange} required/>
          <button  className="card-link" style={{color:"green"}} onClick={handelAdd} >Add</button>
    </div>
  )
}
