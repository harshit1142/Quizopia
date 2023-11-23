import React, { useEffect } from 'react'
import '../Admin/styles.css'
import img from '../Admin/admin.png'
import { useState } from 'react'
import StudentList from '../../Components/StudentList';
import NoticeList from '../../Components/NoticeList';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TeacherNoticeList from '../../Components/TeacherNoticeList';

export default function Teacher() {
    const userId=JSON.parse(localStorage.getItem("user"))._id;
    const history=useHistory();
    const [curr,setCurr]=useState("dash");
    const [notice,setNotice]=useState({
        title:"",
        year:"",
        branch:""
    });
    const [isfetch,setFetch]=useState(false);
    const [allNotice,setAllNotice]=useState([]);
    const [adminNotice,setAdminNotice]=useState([]);

  const [student,setStudent]=useState([]);

   function handleChange(e){
        setNotice({...notice,[e.target.name]:e.target.value});
    }
  

    const fetchStudent=async ()=>{
          const response= await fetch("http://localhost:4000/student");
                        const res=await response.json();
                        setStudent(res.data);                  
    }
    const fetchNotice=async ()=>{
          const response= await fetch(`http://localhost:4000/teacher/notice/${userId}`);
                        const res=await response.json();
                        setAllNotice(res.data);                  
    }
    const fetchAdminNotice=async ()=>{
          const response= await fetch(`http://localhost:4000/admin/notice`);
                        const res=await response.json();
                        setAdminNotice(res.data);                  
    }

useEffect(()=>{
     fetchStudent();
     fetchNotice();
     fetchAdminNotice();
},[isfetch])

   function handleLogout(){
    alert("Logout Successfully !!!")
       localStorage.removeItem("user");
       history.push("/");
  }
//  adminNotice.map((elee,pos)=>elee.notice.map((ele,ind)=>
//  console.log(adminNotice[pos].name)

//  ))

   async function handleNotice(){
     const response= await fetch(`http://localhost:4000/teacher/notice/${userId}`,{
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                      title:notice.title,
                      year:notice.year,
                      branch:notice.branch
                    })
                })
                const res= await response.json();
                if(res.status===201)
                {
                    alert("Added Successfully!!");
                    setFetch(!isfetch);
                    setCurr("dash");
                }else{
                    alert("Error Occured");
                }
  }

  return (
    <>
      <div class="wrapper">
        <nav class="navbar">
            <div class="left-navbar">
                <div class="quiz-heading">QUIZOPIA</div>
                {/* <!-- <div class="button-bar"><button>bar</button></div> --> */}
            </div>
           <a onClick={handleLogout}> <div class="logout-btn">Logout  <i class='fas fa-user-cog logout-icon'></i></div></a>
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
                    <a onClick={()=>setCurr("add_notice")} class="cards cards-teacherquestion">
                        <div class="btn-content">Add Notice <span class="icon"><i class='fa fa-plus'></i></span>
                        </div>
                    </a>
                    <a onClick={()=>setCurr("your_notice")} class="cards cards-teacherquestion">
                        <div class="btn-content">Your Notice <span class="icon"><i class='fa fa-plus'></i></span>
                        </div>
                    </a>
                    <a onClick={()=>setCurr("admin_notice")}  class="cards cards-teacherquestion">
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
            :curr==="your_notice"?
               <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Notice</th>
                    <th scope="col">By</th>
                    <th scope="col">Date</th>
                    <th scope="col">Branch</th>
                    <th scope="col">Graduation Year</th>
                    </tr>
                </thead>
                <tbody>
                     {allNotice!=null && allNotice[0].notice.map((ele,ind)=> <TeacherNoticeList key={ele._id} name={allNotice[0].name} ind={ind} list={ele} />)} 
                 </tbody>
                </table>
            :curr==="admin_notice"?
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
                     {adminNotice!=null && adminNotice.map((item,pos)=>item.notice.map((ele,ind)=> <NoticeList key={ele._id} name={adminNotice[pos].name} ind={ind} list={ele} />))} 
                 </tbody>
                </table>
            :""}
            {curr==="add_notice"?
              <section className="main-content">
                <div className="addquestion-container">
                    <div className="heading-addquestion item">Add Notice</div>
                    <div className="question-box">
                        <div className="item" id="item4">
                           <div className="inp-box m-1"><textarea  type="text" name="title" value={notice.title} onChange={handleChange} className="input-bar"
                                    placeholder="Enter Notice Here!!" /></div>
                           <div id="item5" className="item">
                        {/* <!-- <label htmlFor="name">Confirm Password:</label> --> */}
                        <select name="branch" id="selectbranch" className="inputbar"  onChange={handleChange} value={notice.branch} required>
                            <option value="selectbr">Select Branch</option>
                            <option value="biotech">Biotechnology</option>
                            <option value="ch">Chemical engineering</option>
                            <option value="ce">Civil engineering</option>
                            <option value="cse">Computer science and engineering</option>
                            <option value="ee">Electrical engineering</option>
                            <option value="ece">Electronics and communication engineering</option>
                            <option value="me">Mechanical engineering</option>                           
                            <option value="pie">Production and industrial engineering</option>
                        </select>

                    </div>
                           <div className="inp-box m-1"><input  type="text" name="year" value={notice.year} onChange={handleChange} className="input-bar"
                                    placeholder="Enter Graduation Year!!" /></div>
                  
                        <div className="item" id="item8">
                            <a onClick={()=>handleNotice()} className="btn-pink">ADD</a>
                        </div>
                    </div>
                    </div>

               </div>
            </section> 
            :""}
          </div>
        </div>

    </>
  )
}
