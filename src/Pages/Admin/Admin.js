import React from 'react'
import './styles.css'
import img from './admin.png'
import { useState } from 'react'


export default function Admin() {
  const [curr,setCurr]=useState("dash");

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
                    <a  className="cards cards-admin">
                        <div className="btn-content">Total Teacher <span className="icon"><i
                                    className='fas fa-chalkboard-teacher'></i></span>
                        </div>
                    </a>
                    <a  className="cards cards-admin">
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
                    <a  class="cards cards-adminteacher">
                        <div class="btn-content">Total Teacher <span class="icon"><i
                                    class='fas fa-chalkboard-teacher'></i></span></div>
                    </a>
                    <a  class="cards cards-adminteacher">
                        <div class="btn-content">Total Teacher Requests Pending <span class="icon"><i
                                    class='fas fa-circle-notch'></i></span></div>
                    </a>
                </div>
            </section>
            :curr==="student"?
             <section class="main-content">
                <div class="card-box">
                    <a  class="cards cards-adminstudent">
                        <div class="btn-content">Total Student <span class="icon"><i
                                    class='fas fa-user-graduate'></i></span></div>
                    </a>
                    <a  class="cards cards-adminstudent">
                        <div class="btn-content">Student Marks <span class="icon"><i
                                    class='fas fa-sort-numeric-down'></i></span></div>
                    </a>
                </div>
            </section>
            :
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
            }
        </div>

    </div>
    </>
  )
}
