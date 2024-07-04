import React, { useEffect } from 'react'
import './styles.css'
import img from './admin.png'
import { useState } from 'react'
import TeacherList from '../../Components/TeacherList';
import AdminList from '../../Components/AdminList';
import StudentList from '../../Components/StudentList';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import NoticeList from '../../Components/NoticeList';
import { useDispatch, useSelector } from 'react-redux';
import { setChange } from '../../Redux/ReloadRedux';
import { socket } from '../../App';

const selectUser = (state) => state.rootReducer.UserReducer.user;
const selectQuiz = (state) => state.rootReducer.QuizReducer.quiz;
const selectChange = (state) => state.rootReducer.ReloadReducer.change;

export default function Admin() {
    const dispatch=useDispatch();
    const user=useSelector(selectUser);
    var change = useSelector(selectChange)
    const history=useHistory();
  const [curr,setCurr]=useState("dash");
 const [isfetch,setFetch]=useState(false);
  const [teacher,setTeacher]=useState([]);
  const [student,setStudent]=useState([]);
  const [allNotice,setAllNotice]=useState([]);
 
  const [notice,setNotice]=useState("");
  
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
    const fetchNotice=async ()=>{
          const response= await fetch(`http://localhost:4000/admin/notice/${user._id}`);
                        const res=await response.json();
                        setAllNotice(res.data);                  
    }

    //socket 
    socket.on('refreshAdminNotice', () => {
        fetchNotice();
    })
    socket.on('refreshUser', () => {
        fetchTeacher();
        fetchStudent();
    })
    socket.on('refreshAdminAction', () => {
        fetchTeacher();
    })

useEffect(()=>{
     fetchTeacher();
     fetchStudent();
     fetchNotice();
},[change])
 
  function handleLogout(){
    alert("Logout Successfully !!!")
       localStorage.removeItem("user");
       history.push("/");
  }

 async function handleNotice(){
     const response= await fetch(`http://localhost:4000/admin/notice/${user._id}`,{
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                      title:notice
                    })
                })
                const res= await response.json();
                if(res.status===201)
                {
                    alert("Added Successfully!!");
                    socket.emit('addedAdminNotice')
                    setFetch(!isfetch);
                    setCurr("dash");
                    
                    
                }else{
                    alert("Error Occured");
                }
  }
  async function handleRemove(id){
       const response= await fetch(`http://localhost:4000/teacher/remove/${id}`);
                        const res=await response.json();
                        if(res.status===201){
                          alert("Removed!!");
                          socket.emit('adminAction');
                          setFetch(!isfetch);
                         
                        }
                        else{
                          alert("Error Occured");
                        }
   }
    async function handleAccept(id){
                const response= await fetch(`http://localhost:4000/teacher/add/${id}`);
                        const res=await response.json();
                        if(res.status===201){
                          alert("Accepted!!");
                            socket.emit('adminAction');
                          setFetch(!isfetch);
                    
                        }
                        else{
                          alert("Error Occured");
                        }
   }
   async function handleDecline(id){
       const response= await fetch(`http://localhost:4000/teacher/delete/${id}`);
                        const res=await response.json();
                        if(res.status===201){
                          alert("Deleted!!");
                            socket.emit('adminAction');
                          setFetch(!isfetch);
                           
                        }
                        else{
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
           <a > <div className="logout-btn text-light" onClick={handleLogout}>Logout  <i className='fas fa-user-cog logout-icon'></i></div> </a>
        </nav>
        <div className="page-content">
            <div className="sidebar">
                <div className="pic-headbox">
                    <div className="pic"><img src={img} alt="" height="70px" width="70px" /></div>
                    <div className="admin-head">{user.name}</div>
                </div>
                <div className="option-bar">
                          <a onClick={() => setCurr("dash")} className="icon-link">
                        <div className="option-iconbox">
                            <span className="icon-sidebar"><ion-icon name="mail"></ion-icon></span>
                            <div className="options" >Dashboard </div>
                        </div>
                    </a>
                          <a onClick={() => setCurr("teacher")} className="icon-link">
                        <div className="option-iconbox">
                            <span className="icon-sidebar"><i className='fas fa-chalkboard-teacher'></i></span>
                            <div className="options" >Teacher</div>
                        </div>
                    </a>
                          <a onClick={() => setCurr("student")} className="icon-link">
                        <div className="option-iconbox">
                            <span className="icon-sidebar"><i className='fas fa-user-graduate'></i></span>
                            <div className="options">Student</div>
                        </div>
                    </a>
                          <a onClick={() => setCurr("notice")} className="icon-link">
                        <div className="option-iconbox">
                            <span className="icon-sidebar"><i className='fa fa-tasks'></i></span>
                            <div className="options" >Notice</div>
                        </div>
                    </a>
                </div>
            </div>
            { curr==="dash"?
              <section className="main-content">
                <div className="card-box">
                              <a onClick={() => setCurr("teacher")} className="cards cards-admin">
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
                <div className="card-box">
                    <a onClick={()=>setCurr("add_notice")} className="cards cards-teacherquestion">
                        <div className="btn-content">Add Notice <span className="icon"><i className='fa fa-plus'></i></span>
                        </div>
                    </a>
                    <a onClick={()=>setCurr("your_notice")}  className="cards cards-teacherquestion">
                        <div className="btn-content">Your Notice <span className="icon"><i className='fa fa-plus'></i></span>
                        </div>
                    </a>
                </div>
            </section>
            :curr==="add_notice"?
               <section className="main-content">
                <div className="addquestion-container">
                    <div className="heading-addquestion item">Add Notice</div>
                    <div className="question-box">
                        <div className="item" id="item4">
                           <div className="inp-box"><textarea  type="text" name="notice" value={notice} onChange={(e)=>setNotice(e.target.value)} className="input-bar"
                                    placeholder="Enter Here!!" /></div>
                  
                        <div className="item" id="item8">
                            <a onClick={()=>handleNotice()} className="btn-pink">ADD</a>
                        </div>
                    </div>
                    </div>

               </div>
            </section> 
            :curr==="your_notice"?
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
                     {allNotice!=null && allNotice[0].notice.map((ele,ind)=> <NoticeList key={ele._id} name={allNotice[0].name} ind={ind} list={ele}  />)} 
                 </tbody>
                </table>

                
                
            
            :""}
            {curr==="total_teacher"?
             <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                   {teacher!=null && teacher.filter((tea)=>tea.accepted===true).map((ele,ind)=><TeacherList list={ele} ind={ind} key={ele._id} click={()=>handleRemove(ele._id)}/> )}
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
                    {/* <th scope="col">Decline</th> */}
                    </tr>
                </thead>
                <tbody>
                    {teacher!=null && teacher.filter((tea)=>tea.accepted===false).map((ele,ind)=><AdminList list={ele} ind={ind} key={ele._id} add={()=>handleAccept(ele._id)} remove={()=>handleDecline(ele._id)}/>)}
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
