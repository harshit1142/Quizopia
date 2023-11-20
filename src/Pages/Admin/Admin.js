import React, { useEffect } from 'react'
import './styles.css'
import img from './admin.png'
import { useState } from 'react'
import List from '../../Components/List';
import List2 from '../../Components/List2';
import StudentList from '../../Components/StudentList';


export default function Admin() {
  const [curr,setCurr]=useState("dash");

  const [teacher,setTeacher]=useState([]);
  const [student,setStudent]=useState([]);
  
    const fetchTeacher=async ()=>{
          const response= await fetch("http://localhost:4000/teacher");
                        const res=await response.json();
                        setTeacher(res.data);                  
    }
    const fetchStudent=async ()=>{
          const response= await fetch("http://localhost:4000/student");
                        const res=await response.json();
                        setStudent(res.data);                  
    }

useEffect(()=>{
     fetchTeacher();
     fetchStudent();
},[])


  return (
    <>
      <div className="wrapper">
        <nav className="navbar">
            <div className="left-navbar">
                <div className="quiz-heading">QUIZOPIA</div>
                {/* <!-- <div className="button-bar"><button>bar</button></div> --> */}
            </div>
            <div className="logout-btn"><button><a id="logout-text" >Logout  <i className='fas fa-user-cog logout-icon'></i></a></button></div>
        </nav>
        <div className="page-content">
            <div className="sidebar">
                <div className="pic-headbox">
                    <div className="pic"><img src={img} alt="" height="70px" width="70px" /></div>
                    <div className="admin-head">ADMIN</div>
                </div>
                <div className="option-bar">
                    <a  className="icon-link">
                        <div className="option-iconbox">
                            <span className="icon"><ion-icon name="mail"></ion-icon></span>
                            <div className="options" onClick={()=>setCurr("dash")}>Dashboard </div>
                        </div>
                    </a>
                    <a  className="icon-link">
                        <div className="option-iconbox">
                            <span className="icon"><i className='fas fa-chalkboard-teacher'></i></span>
                            <div className="options" onClick={()=>setCurr("teacher")}>Teacher</div>
                        </div>
                    </a>
                    <a  className="icon-link">
                        <div className="option-iconbox">
                            <span className="icon"><i className='fas fa-user-graduate'></i></span>
                            <div className="options" onClick={()=>setCurr("student")}>Student</div>
                        </div>
                    </a>
                    <a  className="icon-link">
                        <div className="option-iconbox">
                            <span className="icon"><i className='fa fa-tasks'></i></span>
                            <div className="options" onClick={()=>setCurr("courses")}>Courses</div>
                        </div>
                    </a>
                </div>
            </div>
            { curr==="dash"?
              <section className="main-content">
                <div className="card-box">
                    <a onClick={()=>setCurr("total_teacher")} className="cards cards-admin">
                        <div className="btn-content">Total Teacher <span className="icon"><i
                                    className='fas fa-chalkboard-teacher'></i></span>
                        </div>
                    </a>
                    <a onClick={()=>setCurr("total_student")} className="cards cards-admin">
                        <div className="btn-content">Total Student <span className="icon"><i
                                    className='fas fa-user-graduate'></i></span>
                        </div>
                    </a>
                    <a  className="cards cards-admin">
                        <div className="btn-content">Total Courses <span className="icon"><i className='fa fa-tasks'></i></span>
                        </div>
                    </a>
                    <a  className="cards cards-admin">
                        <div className="btn-content">Total Questions <span className="icon"><i
                                    className='fa fa-question'></i></span></div>
                    </a>
                </div>
            </section>
            :curr==="teacher"?
             <section class="main-content">
                <div class="card-box">
                    <a onClick={()=>setCurr("total_teacher")} class="cards cards-adminteacher">
                        <div class="btn-content">Total Teacher <span class="icon"><i
                                    class='fas fa-chalkboard-teacher'></i></span></div>
                    </a>
                    <a onClick={()=>setCurr("teacher_req")} class="cards cards-adminteacher">
                        <div class="btn-content">Total Teacher Requests Pending <span class="icon"><i
                                    class='fas fa-circle-notch'></i></span></div>
                    </a>
                </div>
                
            </section>
            :curr==="student"?
             <section class="main-content">
                <div class="card-box">
                    <a onClick={()=>setCurr("total_student")} class="cards cards-adminstudent">
                        <div class="btn-content">Total Student <span class="icon"><i
                                    class='fas fa-user-graduate'></i></span></div>
                    </a>
                    {/* <a onClick={()=>setCurr("")} class="cards cards-adminstudent">
                        <div class="btn-content">Student Marks <span class="icon"><i
                                    class='fas fa-sort-numeric-down'></i></span></div>
                    </a> */}
                </div>
            </section>
            :curr==="courses"?
            <section class="main-content">
                <div class="addquestion-container">
                    <div class="heading-addquestion item">ADD COURSE</div>
                    <div class="question-box">
                        <div class="item" id="item4">
                            <div class="inp-boxheading"><label for="course">Course</label></div>
                            <div class="inp-box"><input name="course" type="text" class="input-bar"
                                    placeholder="Enter Course" /></div>
                  
                        <div class="item" id="item8">
                            <button type="submit" class="btn-pink">ADD</button>
                        </div>
                    </div>
                    </div>

               </div>
            </section>
            :""}
            {curr==="total_teacher"?
             <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Subject</th>
                    </tr>
                </thead>
                <tbody>
                   {teacher.filter((tea)=>tea.accepted===true).map((ele,ind)=><List list={ele} ind={ind} key={ele._id} />)}
                </tbody>
                </table>
            :
            ""}
            {curr==="teacher_req"?
             <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Accept</th>
                    <th scope="col">Decline</th>
                    </tr>
                </thead>
                <tbody>
                    {teacher.filter((tea)=>tea.accepted===false).map((ele,ind)=><List2 list={ele} ind={ind} key={ele._id} />)}
                </tbody>
                </table>
            :
            ""}
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
