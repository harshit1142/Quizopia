import React, { useEffect } from 'react'
import '../Admin/styles.css'
import img from '../Admin/admin.png'
import { useState } from 'react'
import StudentList from '../../Components/StudentList';
import NoticeList from '../../Components/NoticeList';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TeacherNoticeList from '../../Components/TeacherNoticeList';
import QuizList from '../../Components/QuizList';
import { useSelector } from 'react-redux';

export default function Teacher() {
    const user = useSelector(state => state.user);
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
    const [quiz,setQuiz]=useState([]);
    const [addQuiz,setAddQuiz]=useState({
        title:"",
        description:"",
        branch:"",
        graduationYear:"",
        date:"",
        duration:"",
        totalMarks:""
    })

  const [student,setStudent]=useState([]);

   function handleChange(e){
        setNotice({...notice,[e.target.name]:e.target.value});
    }

   function handleQuizChange(e){
        setAddQuiz({...addQuiz,[e.target.name]:e.target.value});
    }
  

    const fetchStudent=async ()=>{
            const response= await fetch("http://localhost:4000/student");
                          const res=await response.json();
                          setStudent(res.data);                  
        }
    
    const fetchNotice=async ()=>{
          const response = await fetch(
            `http://localhost:4000/teacher/notice/${user._id}`
          );
          const res = await response.json();
          setAllNotice(res.data);
        
    }
    const fetchAdminNotice=async ()=>{
          const response= await fetch(`http://localhost:4000/admin/notice`);
                        const res=await response.json();
                        setAdminNotice(res.data);                  
    }
    const fetchQuiz=async ()=>{
          const response= await fetch(`http://localhost:4000/quiz/teacher/${user._id}`);
                        const res=await response.json();
                        setQuiz(res.data);
                                      
    }

useEffect(()=>{
     fetchStudent();
     fetchNotice();
     fetchAdminNotice();
     fetchQuiz();
},[isfetch])

   function handleLogout(){
    alert("Logout Successfully !!!")
       localStorage.removeItem("user");
       history.push("/");
  }
//  adminNotice.map((elee,pos)=>elee.notice.map((ele,ind)=>
//  console.log(adminNotice[pos].name)
 
//    console.log(quiz[0].quiz);

//  ))

   async function handleNotice(){
     const response= await fetch(`http://localhost:4000/teacher/notice/${user._id}`,{
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
   async function handleQuiz(){
     const response = await fetch(
       `http://localhost:4000/quiz/teacher/${user._id}`,
       {
         method: "POST",
         headers: {
           "content-type": "application/json",
         },
         body: JSON.stringify({
           title: addQuiz.title,
           year: addQuiz.year,
           branch: addQuiz.branch,
           graduationYear: addQuiz.graduationYear,
           date: addQuiz.date,
           duration: addQuiz.duration,
           totalMarks: addQuiz.totalMarks,
           description: addQuiz.description,
         }),
       }
     );
                const res= await response.json();
                if(res.status===200)
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
           <a onClick={handleLogout}> <div class="logout-btn text-light">Logout  <i class='fas fa-user-cog logout-icon'></i></div></a>
        </nav>
        {user.accepted?
        <div class="page-content">
            <div class="sidebar">
                <div class="pic-headbox">
                    <div class="pic"><img src={img} alt="" height="70px" width="70px" /></div>
                    <div class="admin-head" >{user.name}</div>
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
                    <a onClick={()=>setCurr("add_quiz")} class="cards cards-teacherexam">
                        <div class="btn-content">Add Quiz <span class="icon"><i class='fa fa-plus'></i></span>
                        </div>
                    </a>
                    <a onClick={()=>setCurr("view_quiz")} class="cards cards-teacherexam">
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
            {curr==="add_quiz"?
              <section className="main-content">
                <div className="addquestion-container">
                    <div className="heading-addquestion item">Add Quiz</div>
                    <div className="question-box">
                        <div className="item" id="item4">
                           <div className="inp-box m-1"><textarea  type="text" name="title" value={addQuiz.title} onChange={handleQuizChange} className="input-bar"
                                    placeholder="Enter Title Here!!" /></div>
                           <div className="inp-box m-1"><textarea  type="text" name="description" value={addQuiz.description} onChange={handleQuizChange} className="input-bar"
                                    placeholder="Enter Description Here!!" /></div>
                           <div id="item5" className="item">
                        {/* <!-- <label htmlFor="name">Confirm Password:</label> --> */}
                        <select name="branch" id="selectbranch" className="inputbar"  onChange={handleQuizChange} value={addQuiz.branch} required>
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
                           <div className="inp-box m-1"><input  type="text" name="graduationYear" value={addQuiz.graduationYear} onChange={handleQuizChange} className="input-bar"
                                    placeholder="Enter Graduation Year!!" /></div>
                           <div className="inp-box m-1"><input value={addQuiz.date} onChange={handleQuizChange}
                                                            type="datetime-local"
                                                            id="meeting-time"
                                                            name="date"
                                                            
                                                            min="2018-06-07T00:00"
                                                            max="2040-06-14T00:00" /></div>
                           
                           <div className="inp-box m-1"><input  type="text" name="totalMarks" value={addQuiz.totalMarks} onChange={handleQuizChange} className="input-bar"
                                    placeholder="Enter Total Marks !!" /></div>
                           <div className="inp-box m-1"><input  type="text" name="duration" value={addQuiz.duration} onChange={handleQuizChange} className="input-bar"
                                    placeholder="Enter Duration in Minutes !!" /></div>
                           
                        <div className="item" id="item8">
                            <a onClick={()=>handleQuiz()} className="btn-pink">ADD</a>
                        </div>
                    </div>
                    </div>

               </div>
            </section> 
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
            :curr==="view_quiz"?
            <section class="main-content">
                <div class="card-box m-3 d-flex flex-wrap">
              {quiz!=null && quiz[0].quiz.map((item,pos)=> <QuizList list={item} ind={pos} key={item._id} name={quiz[0].name}/>) }
               </div>
            </section> 
            :""}
          </div>

        :<section class="main-content">
                <div class="card-box">
                
                        <div class="btn-content">Your request yet not accepted by Admin</div>
                    
                    </div>
                    </section>
                    }
        </div>
        
    </>
  )
}
