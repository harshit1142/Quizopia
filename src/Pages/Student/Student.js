import React from 'react'
import { useState } from 'react'
import img from '../Admin/admin.png'

export default function Student() {
  const [curr,setCurr]=useState("dash");

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
                        <div class="admin-head">STUDENT</div>
                    </div>
                    <div class="option-bar">
                        <a onClick={()=>setCurr("dash")} class="icon-link">
                            <div class="option-iconbox">
                                <span class="icon"><ion-icon name="mail"></ion-icon></span>
                                <div class="options">Dashboard </div>
                            </div>
                        </a>
                        <a onClick={()=>setCurr("quiz")} class="icon-link">
                            <div class="option-iconbox">
                                <span class="icon"><i class='fa fa-exclamation-circle'></i></span>
                                <div class="options">Quiz</div>
                            </div>
                        </a>
                        <a onClick={()=>setCurr("marks")} class="icon-link">
                            <div class="option-iconbox">
                                <span class="icon"><i class='fas fa-sort-numeric-down'></i></span>
                                <div class="options">Marks</div>
                            </div>
                        </a>
                    </div>
                </div>
                {curr==="dash"?
                <section class="main-content">
                    <div class="card-box">
                        <a href="" class="cards cards-student"><div class="btn-content">Total Quiz Available  <span class="icon"><i class='fa fa-exclamation-circle'></i></span></div></a>
                        <a href="" class="cards cards-student"><div class="btn-content">Total Questions  <span class="icon"><i class='fa fa-question'></i></span></div></a>
                    </div>
                </section>:
                curr==="quiz"?
                <section class="main-content">
                    <div class="card-box">
                        <a href="" class="cards cards-studentexams"><div class="btn-content">Courses  <span class="icon"><i class='fa fa-tasks'></i></span></div></a>
                    </div>
                </section>
                :<section class="main-content">
                <div class="card-box">
                    <a href="" class="cards cards-studentmarks">
                        <div class="btn-content">Scorecard <span class="icon">
                        <i class='fas fa-sort-numeric-down'></i></span></div>
                    </a>
                </div>
            </section>
            }
            </div>

    </div>
    </>
  )
}
