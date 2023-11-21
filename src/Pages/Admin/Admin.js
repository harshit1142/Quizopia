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
          const response= await fetch("http://localhost:4000/teacher",{withCredentials: true});
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

  function handleLogout(){

  }


  return (
    <>
      <div className="wrapper">
        <nav className="navbar">
            <div className="left-navbar">
                <div className="quiz-heading">QUIZOPIA</div>
                {/* <!-- <div className="button-bar"><button>bar</button></div> --> */}
            </div>
            <div className="logout-btn"><button><a onClick={()=>handleLogout} >Logout  <i className='fas fa-user-cog logout-icon'></i></a></button></div>
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
                            <span className="icon-sidebar"><ion-icon name="mail"></ion-icon></span>
                            <div className="options" onClick={()=>setCurr("dash")}>Dashboard </div>
                        </div>
                    </a>
                    <a  className="icon-link">
                        <div className="option-iconbox">
                            <span className="icon-sidebar"><i className='fas fa-chalkboard-teacher'></i></span>
                            <div className="options" onClick={()=>setCurr("teacher")}>Teacher</div>
                        </div>
                    </a>
                    <a  className="icon-link">
                        <div className="option-iconbox">
                            <span className="icon-sidebar"><i className='fas fa-user-graduate'></i></span>
                            <div className="options" onClick={()=>setCurr("student")}>Student</div>
                        </div>
                    </a>
                    <a  className="icon-link">
                        <div className="option-iconbox">
                            <span className="icon-sidebar"><i className='fa fa-tasks'></i></span>
                            <div className="options" onClick={()=>setCurr("notice")}>Notice</div>
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
                    <a onClick={()=>setCurr("notice")} className="cards cards-admin">
                        <div className="btn-content">Notice<span className="icon"><i className='fa fa-tasks'></i></span>
                        </div>
                    </a>
                    {/* <a  className="cards cards-admin">
                        <div className="btn-content">Quizes<span className="icon"><i
                                    className='fa fa-question'></i></span></div>
                    </a> */}
                </div>
            </section>
            :curr==="teacher"?
             <section className="main-content">
                <div className="card-box">
                    <a onClick={()=>setCurr("total_teacher")} className="cards cards-adminteacher">
                        <div className="btn-content">Total Teacher <span className="icon"><i
                                    className='fas fa-chalkboard-teacher'></i></span></div>
                    </a>
                    <a onClick={()=>setCurr("teacher_req")} className="cards cards-adminteacher">
                        <div className="btn-content">Total Teacher Requests Pending <span className="icon"><i
                                    className='fas fa-circle-notch'></i></span></div>
                    </a>
                </div>
                
            </section>
            :curr==="student"?
             <section className="main-content">
                <div className="card-box">
                    <a onClick={()=>setCurr("total_student")} className="cards cards-adminstudent">
                        <div className="btn-content">Total Student <span className="icon"><i
                                    className='fas fa-user-graduate'></i></span></div>
                    </a>
                    {/* <a onClick={()=>setCurr("")} className="cards cards-adminstudent">
                        <div className="btn-content">Student Marks <span className="icon"><i
                                    className='fas fa-sort-numeric-down'></i></span></div>
                    </a> */}
                </div>
            </section>
            :curr==="notice"?
            <section className="main-content">
                <div className="addquestion-container">
                    <div className="heading-addquestion item">Add Notice</div>
                    <div className="question-box">
                        <div className="item" id="item4">
                            {/* <div className="inp-boxheading m-4"><label for="course">Notice</label></div> */}
                            <div className="inp-box"><textarea name="course" type="text" className="input-bar"
                                    placeholder="Enter Here!!" /></div>
                  
                        <div className="item" id="item8">
                            <button type="submit" className="btn-pink">ADD</button>
                        </div>
                    </div>
                    </div>

               </div>
            </section>
            :""}
            {curr==="total_teacher"?
             <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Subject</th>
                    </tr>
                </thead>
                <tbody>
                   {teacher!=null && teacher.filter((tea)=>tea.accepted===true).map((ele,ind)=><List list={ele} ind={ind} key={ele._id} /> )}
                </tbody>
                </table>
            :
            ""}
            {curr==="teacher_req"?
             <table className="table">
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
                    {teacher!=null && teacher.filter((tea)=>tea.accepted===false).map((ele,ind)=><List2 list={ele} ind={ind} key={ele._id} />)}
                </tbody>
                </table>
            :
            ""}
            {curr==="total_student"?
             <table className="table">
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
                    {student!=null && student.map((ele,ind)=><StudentList list={ele} ind={ind} key={ele._id} />)}
                </tbody>
                </table>
            :
            ""}
        </div>

    </div>
    </>
  )
}
