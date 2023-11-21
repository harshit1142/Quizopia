import React, { useEffect } from 'react'
import '../Admin/styles.css'
import img from '../Admin/admin.png'
import { useState } from 'react'
import StudentList from '../../Components/StudentList';

export default function Teacher() {
  const [curr,setCurr]=useState("dash");

  const [student,setStudent]=useState([]);
  

    const fetchStudent=async ()=>{
          const response= await fetch("http://localhost:4000/student");
                        const res=await response.json();
                        setStudent(res.data);                  
    }

useEffect(()=>{
     fetchStudent();
},[])

  return (
    <>
      <div class="wrapper">
        <nav class="navbar">
            <div class="left-navbar">
                <div class="quiz-heading">QUIZOPIA</div>
                {/* <!-- <div class="button-bar"><button>bar</button></div> --> */}
            </div>
            <div class="logout-btn"><button><a id="logout-text" href="login.html">Logout  <i class='fas fa-user-cog logout-icon'></i></a></button></div>
        </nav>
        <div class="page-content">
            <div class="sidebar">
                <div class="pic-headbox">
                    <div class="pic"><img src={img} alt="" height="70px" width="70px" /></div>
                    <div class="admin-head" >TEACHER</div>
                </div>
                <div class="option-bar">
                    <a  onClick={()=>setCurr("dash")} class="icon-link">
                        <div class="option-iconbox">
                            <span class="icon-sidebar"><ion-icon name="mail"></ion-icon></span>
                            <div class="options" >Dashboard </div>
                        </div>
                    </a>
                    <a  onClick={()=>setCurr("quiz")} class="icon-link">
                        <div class="option-iconbox">
                            <span class="icon-sidebar"><i class='fas fa-book-reader'></i></span>
                            <div class="options" >Quiz</div>
                        </div>
                    </a>
                    <a onClick={()=>setCurr("notice")}  class="icon-link">
                        <div  class="option-iconbox">
                            <span class="icon-sidebar"><i class='fa fa-question'></i></span>
                            <div class="options">Notice</div>
                        </div>
                    </a>
                </div>
            </div>
            { curr==="dash"?
              <section class="main-content">
                <div class="card-box">
                    <a onClick={()=>setCurr("total_student")} class="cards cards-teacherdashboard">
                        <div class="btn-content">Total Student <span class="icon"><i
                            class='fas fa-user-graduate'></i></span>
                        </div>
                    </a>
                    <a onClick={()=>setCurr("quiz")} class="cards cards-teacherdashboard">
                        <div class="btn-content">Total Quiz <span class="icon"><i class='fas fa-book-reader'></i></span>
                        </div>
                    </a>
                    <a onClick={()=>setCurr("notice")} class="cards cards-teacherdashboard">
                        <div class="btn-content">Notice<span class="icon"><i class='fa fa-question'></i></span>
                        </div>
                    </a>
                </div>
            </section>:
             curr==="quiz"?
             <section class="main-content">
                <div class="card-box">
                    <a  class="cards cards-teacherexam">
                        <div class="btn-content">Add Quiz <span class="icon"><i class='fa fa-plus'></i></span>
                        </div>
                    </a>
                    <a  class="cards cards-teacherexam">
                        <div class="btn-content">View Quiz <span class="icon"><i class='fa fa-eye'></i></span>
                        </div>
                    </a>
                </div>
            </section>
            :curr==="notice"?
            <section class="main-content">
                <div class="card-box">
                    <a  class="cards cards-teacherquestion">
                        <div class="btn-content">Add Notice <span class="icon"><i class='fa fa-plus'></i></span>
                        </div>
                    </a>
                    <a href="" class="cards cards-teacherquestion">
                        <div class="btn-content">View Notice By Admin <span class="icon"><i class='fa fa-eye'></i></span>
                        </div>
                    </a>
                </div>
            </section>:null}
             {curr==="total_student"?
             <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Branch</th>
                    <th scope="col">Graduation Year</th>
                    </tr>
                </thead>
                <tbody>
                    {student.map((ele,ind)=><StudentList list={ele} ind={ind} key={ele._id} />)}
                </tbody>
                </table>
            :
            ""}
          </div>
        </div>

    </>
  )
}
