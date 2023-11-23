import React from 'react'
import { useState } from 'react'
import img from '../Admin/admin.png'
import NoticeList from '../../Components/NoticeList';
import { useEffect } from 'react';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Student() {
    const user=JSON.parse(localStorage.getItem("user"));
    const history=useHistory();
  const [curr,setCurr]=useState("dash");
  const [teacherNotice,setTeacherNotice]=useState([]);
  
  function handleLogout(){
    alert("Logout Successfully !!!")
       localStorage.removeItem("user");
       history.push("/");
  }
 
   const fetchNotice=async ()=>{
          const response= await fetch(`http://localhost:4000/teacher/notice`);
                        const res=await response.json();
                        setTeacherNotice(res.data);                  
    }

    useEffect(()=>{
     fetchNotice();
},[])

  return (
    <>
       <div class="wrapper">
            <nav class="navbar">
                <div class="left-navbar">
                    <div class="quiz-heading">QUIZOPIA</div>
                    {/* <!-- <div class="button-bar"><button>bar</button></div> --> */}
                </div>
              <a onClick={handleLogout}>  <div class="logout-btn">Logout  <i class='fas fa-user-cog logout-icon'></i></div> </a>
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
                                <span class="icon-sidebar"><ion-icon name="mail"></ion-icon></span>
                                <div class="options">Dashboard </div>
                            </div>
                        </a>
                        <a onClick={()=>setCurr("quiz")} class="icon-link">
                            <div class="option-iconbox">
                                <span class="icon-sidebar"><i class='fa fa-exclamation-circle'></i></span>
                                <div class="options">Quiz</div>
                            </div>
                        </a>
                        <a onClick={()=>setCurr("scorecard")} class="icon-link">
                            <div class="option-iconbox">
                                <span class="icon-sidebar"><i class='fas fa-sort-numeric-down'></i></span>
                                <div class="options">Scorecard</div>
                            </div>
                        </a>
                        <a onClick={()=>setCurr("notice")} class="icon-link">
                            <div class="option-iconbox">
                                <span class="icon-sidebar"><i class='fas fa-sort-numeric-down'></i></span>
                                <div class="options">Notice</div>
                            </div>
                        </a>
                    </div>
                </div>
                {curr==="dash"?
                <section class="main-content">
                    <div class="card-box">
                        <a  onClick={()=>setCurr("quiz")} class="cards cards-student m-2"><div class="btn-content">Total Quiz  <span class="icon"><i class='fa fa-exclamation-circle'></i></span></div></a>
                        <a onClick={()=>setCurr("scorecard")} class="cards cards-student m-2"><div class="btn-content">Scorecard <span class="icon"><i class='fa fa-question'></i></span></div></a>
                        <a onClick={()=>setCurr("notice")} class="cards cards-student m-2"><div class="btn-content">Notice By Teacher <span class="icon"><i class='fa fa-question'></i></span></div></a>
                    </div>
                </section>:
                curr==="quiz"?
                <section class="main-content">
                    <div class="card-box">
                        <a href="" class="cards cards-studentexams"><div class="btn-content">Quiz  <span class="icon"><i class='fa fa-tasks'></i></span></div></a>
                    </div>
                </section>
                :curr==="scorecard"?
                <section class="main-content">
                <div class="card-box">
                    <a href="" class="cards cards-studentmarks">
                        <div class="btn-content">Scorecard <span class="icon">
                        <i class='fas fa-sort-numeric-down'></i></span></div>
                    </a>
                </div>
            </section>
            :curr==="notice"?
               <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Notice</th>
                    <th scope="col">By</th>
                    <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                     {teacherNotice!=null && teacherNotice.map((item,pos)=>item.notice.map((ele,ind)=> <NoticeList key={ele._id} name={teacherNotice[pos].name} ind={ind} list={ele} />))} 
                 </tbody>
                </table>
            :""}
            </div>

    </div>
    </>
  )
}
