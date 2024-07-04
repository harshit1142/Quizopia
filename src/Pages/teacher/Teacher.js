import React, { useEffect } from 'react'
import '../Admin/styles.css'
import img from '../Admin/admin.png'
import { useState } from 'react'
import StudentList from '../../Components/StudentList';
import NoticeList from '../../Components/NoticeList';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TeacherNoticeList from '../../Components/TeacherNoticeList';
import QuizList from '../../Components/QuizList';
import { useDispatch, useSelector } from 'react-redux';
import { setAllQuiz } from '../../Redux/AllQuizRedux';
import { setChange } from '../../Redux/ReloadRedux';
import { socket } from '../../App';

const selectUser = (state) => state.rootReducer.UserReducer.user;
const selectQuiz = (state) => state.rootReducer.QuizReducer.quiz;
const selectAllQuiz = (state) => state.rootReducer.AllQuizReducer.allQuiz;
const selectChange = (state) => state.rootReducer.ReloadReducer.change;

export default function Teacher() {
    const dispatch=useDispatch();
    var change=useSelector(selectChange)
    const user = useSelector(selectUser);
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
    const quiz = useSelector(selectAllQuiz)
    const [addQuiz,setAddQuiz]=useState({
        title:"",
        description:"",
        branch:"",
        graduationYear:"",
        date:"",
        duration:"",
        totalMarks:"",
        name:""
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
                        // if (!localStorage.getItem("allQuiz"))
                            dispatch(setAllQuiz(res.data));
                                      
    }

useEffect(()=>{
     fetchStudent();
     fetchNotice();
     fetchAdminNotice();
     fetchQuiz();
},[])

   function handleLogout(){
    alert("Logout Successfully !!!")
       localStorage.removeItem("user");
       localStorage.removeItem("quiz");
       localStorage.removeItem("allQuiz");
       history.push("/");
  }


  //Socket code 
    socket.on('refreshNotice',()=>{
    fetchNotice();
  })
    socket.on('refreshQuiz',()=>{
    fetchQuiz();
  })
    socket.on('refreshAdminNotice',()=>{
    fetchAdminNotice();
  })
    socket.on('refreshUser', () => {
        fetchStudent();
    })
    socket.on('refreshAdminAction', () => {
        window.location.reload();
    })
   




//  adminNotice.map((elee,pos)=>elee.notice.map((ele,ind)=>
//  console.log(adminNotice[pos].name)
 
//    console.log(quiz[0].quiz);

//  ))

   async function handleNotice(){

    if(notice.title==="" || notice.year==="" || notice.branch===""){
        alert("Invalid Input")
        return
    }

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
                    socket.emit('noticeAdded');
                    setFetch(!isfetch);
                    setCurr("dash");
                    
                }else{
                    alert("Error Occured");
                }
  }
   async function handleQuiz(){

       if (addQuiz.branch === "" || addQuiz.date === "" || addQuiz.duration === "" || addQuiz.title === "" || addQuiz.graduationYear===""){
        alert("Invalid Input")
        return
       }

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
           name:user.name
         }),
       }
     );
                const res= await response.json();
                if(res.status===200)
                {
                    alert("Added Successfully!!");
                    socket.emit('quizAdded');
                    setFetch(!isfetch);
                    localStorage.removeItem("allQuiz");
                    setCurr("dash");
               
                    setAddQuiz({
                        title: "",
                        description: "",
                        branch: "",
                        graduationYear: "",
                        date: "",
                        duration: "",
                        totalMarks: "",
                        name: ""
                       })
                }else{
                    alert("Error Occured");
                }
  }

  return (
    <>
      <div className="wrapper">
        <nav className="navbar">
            <div className="left-navbar">
                <div className="quiz-heading">QUIZOPIA</div>
                {/* <!-- <div className="button-bar"><button>bar</button></div> --> */}
            </div>
           <a onClick={handleLogout}> <div className="logout-btn text-light">Logout  <i className='fas fa-user-cog logout-icon'></i></div></a>
        </nav>
        {user.accepted?
        <div className="page-content">
            <div className="sidebar">
                <div className="pic-headbox">
                    <div className="pic"><img src={img} alt="" height="70px" width="70px" /></div>
                    <div className="admin-head" >{user.name}</div>
                </div>
                <div className="option-bar">
                    <a  onClick={()=>setCurr("dash")} className="icon-link">
                        <div className="option-iconbox">
                            <span className="icon-sidebar"><ion-icon name="mail"></ion-icon></span>
                            <div className="options" >Dashboard </div>
                        </div>
                    </a>
                    <a  onClick={()=>setCurr("quiz")} className="icon-link">
                        <div className="option-iconbox">
                            <span className="icon-sidebar"><i className='fas fa-book-reader'></i></span>
                            <div className="options" >Quiz</div>
                        </div>
                    </a>
                    <a onClick={()=>setCurr("notice")}  className="icon-link">
                        <div  className="option-iconbox">
                            <span className="icon-sidebar"><i className='fa fa-question'></i></span>
                            <div className="options">Notice</div>
                        </div>
                    </a>
                </div>
            </div>
            { curr==="dash"?
              <section className="main-content">
                <div className="card-box">
                    <a onClick={()=>setCurr("total_student")} className="cards cards-teacherdashboard">
                        <div className="btn-content">Total Student <span className="icon"><i
                            className='fas fa-user-graduate'></i></span>
                        </div>
                    </a>
                    <a onClick={()=>setCurr("quiz")} className="cards cards-teacherdashboard">
                        <div className="btn-content">Total Quiz <span className="icon"><i className='fas fa-book-reader'></i></span>
                        </div>
                    </a>
                    <a onClick={()=>setCurr("notice")} className="cards cards-teacherdashboard">
                        <div className="btn-content">Notice<span className="icon"><i className='fa fa-question'></i></span>
                        </div>
                    </a>
                </div>
            </section>:
             curr==="quiz"?
             <section className="main-content">
                <div className="card-box">
                    <a onClick={()=>setCurr("add_quiz")} className="cards cards-teacherexam">
                        <div className="btn-content">Add Quiz <span className="icon"><i className='fa fa-plus'></i></span>
                        </div>
                    </a>
                    <a onClick={()=>setCurr("view_quiz")} className="cards cards-teacherexam">
                        <div className="btn-content">View Quiz <span className="icon"><i className='fa fa-eye'></i></span>
                        </div>
                    </a>
                </div>
            </section>
            :curr==="notice"?
            <section className="main-content">
                <div className="card-box">
                    <a onClick={()=>setCurr("add_notice")} className="cards cards-teacherquestion">
                        <div className="btn-content">Add Notice <span className="icon"><i className='fa fa-plus'></i></span>
                        </div>
                    </a>
                    <a onClick={()=>setCurr("your_notice")} className="cards cards-teacherquestion">
                        <div className="btn-content">Your Notice <span className="icon"><i className='fa fa-plus'></i></span>
                        </div>
                    </a>
                    <a onClick={()=>setCurr("admin_notice")}  className="cards cards-teacherquestion">
                        <div className="btn-content">View Notice By Admin <span className="icon"><i className='fa fa-eye'></i></span>
                        </div>
                    </a>
                </div>
            </section>:null}
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
                                  {student != null && student.map((ele,ind)=><StudentList list={ele} ind={ind} key={ele._id} />)}
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
                     {allNotice[0]!=null && allNotice[0].notice.map((ele,ind)=> <TeacherNoticeList key={ele._id} name={allNotice[0].name} ind={ind} list={ele} />)} 
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
            <section className="main-content">
                <div className="card-box m-3 d-flex flex-wrap">
              {quiz[0]!=null && quiz[0].quiz.map((item,pos)=> <QuizList list={item} ind={pos} key={item._id} name={quiz[0].name}/>) }
               </div>
            </section> 
            :""}
          </div>

        :<section className="main-content">
                <div className="card-box">
                
                        <div className="btn-content">Your request yet not accepted by Admin</div>
                    
                    </div>
                    </section>
                    }
        </div>
        
    </>
  )
}
