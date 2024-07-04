import React from 'react'
import { useState } from 'react'
import img from '../Admin/admin.png'
import NoticeList from '../../Components/NoticeList';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import QuizList from '../../Components/QuizList';
import { useDispatch, useSelector } from 'react-redux';
import QuizList_Student from '../../Components/QuizList_Student';
import { setAllQuiz } from '../../Redux/AllQuizRedux';
import { setRanking } from '../../Redux/RankingRedux';
import { socket } from '../../App';

const selectUser = (state) => state.rootReducer.UserReducer.user;
const selectQuiz = (state) => state.rootReducer.QuizReducer.quiz;
const selectAllQuiz = (state) => state.rootReducer.AllQuizReducer.allQuiz;
const selectChange = (state) => state.rootReducer.ReloadReducer.change;

export default function Student() {
    const user = useSelector(selectUser);
    const history = useHistory();
    var change = useSelector(selectChange)
    const [curr, setCurr] = useState("dash");
    const [teacherNotice, setTeacherNotice] = useState([]);
    const quiz = useSelector(selectAllQuiz)
    const dispatch = useDispatch();

    //   setQuiz(useSelector(selectAllQuiz));

    function handleLogout() {
        alert("Logout Successfully !!!")
        localStorage.removeItem("user");
        localStorage.removeItem("quiz");
        localStorage.removeItem("allQuiz");
        localStorage.removeItem("ranking");
        history.push("/");
    }

    const fetchNotice = async () => {
        const response = await fetch(`http://localhost:4000/teacher/notice`);
        const res = await response.json();
        setTeacherNotice(res.data);
    }
    const fetchQuiz = async () => {
        const response = await fetch(`http://localhost:4000/quiz/teacher`);
        const res = await response.json();
            dispatch(setAllQuiz(res.data));

    }
    const fetchLeaderBoard = async () => {
        const response = await fetch(`http://localhost:4000/leaderBoard/quiz`);
        const res = await response.json();
        dispatch(setRanking(res.data))
    }

    //Socket 
    socket.on('refreshNotice', () => {
        fetchNotice();
    })
    socket.on('refreshQuiz', () => {
        fetchQuiz();
    })

    // socket.on('refreshLeaderboard',()=>{
    //     fetchLeaderBoard();
    // })


    useEffect(() => {
        fetchNotice();
        fetchQuiz();
        fetchLeaderBoard();
    }, [change])

    return (
        <>
            <div className="wrapper">
                <nav className="navbar">
                    <div className="left-navbar">
                        <div className="quiz-heading">QUIZOPIA</div>
                        {/* <!-- <div className="button-bar"><button>bar</button></div> --> */}
                    </div>
                    <a onClick={handleLogout}>  <div className="logout-btn text-light">Logout  <i className='fas fa-user-cog logout-icon'></i></div> </a>
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
                                    <div className="options">Dashboard </div>
                                </div>
                            </a>
                            <a onClick={() => setCurr("view_quiz")} className="icon-link">
                                <div className="option-iconbox">
                                    <span className="icon-sidebar"><i className='fa fa-exclamation-circle'></i></span>
                                    <div className="options">Quiz</div>
                                </div>
                            </a>
                            {/* <a onClick={()=>setCurr("scorecard")} className="icon-link">
                            <div className="option-iconbox">
                                <span className="icon-sidebar"><i className='fas fa-sort-numeric-down'></i></span>
                                <div className="options">Scorecard</div>
                            </div>
                        </a> */}
                            <a onClick={() => setCurr("notice")} className="icon-link">
                                <div className="option-iconbox">
                                    <span className="icon-sidebar"><i className='fas fa-sort-numeric-down'></i></span>
                                    <div className="options">Notice</div>
                                </div>
                            </a>
                        </div>
                    </div>
                    {curr === "dash" ?
                        <section className="main-content">
                            <div className="card-box">
                                <a onClick={() => setCurr("view_quiz")} className="cards cards-student m-2"><div className="btn-content">Total Quiz  <span className="icon"><i className='fa fa-exclamation-circle'></i></span></div></a>
                                {/* <a onClick={()=>setCurr("scorecard")} className="cards cards-student m-2"><div className="btn-content">Scorecard <span className="icon"><i className='fa fa-question'></i></span></div></a> */}
                                <a onClick={() => setCurr("notice")} className="cards cards-student m-2"><div className="btn-content">Notice By Teacher <span className="icon"><i className='fa fa-question'></i></span></div></a>
                            </div>
                        </section> :
                        curr === "view_quiz" ?
                            <section className="main-content">
                                <div className="card-box m-3 d-flex flex-wrap">
                                    {quiz != null && quiz.map((item, pos) => item.quiz.filter((a, b) => a.branch === user.branch && a.graduationYear === user.graduationYear).map((ele, ind) => <QuizList_Student key={ele._id} name={quiz[pos].name} ind={ind} list={ele} />))}
                                </div>
                            </section>
                            : curr === "scorecard" ?
                                <section className="main-content">
                                    <div className="card-box">
                                        <a className="cards cards-studentmarks">
                                            <div className="btn-content">Scorecard <span className="icon">
                                                <i className='fas fa-sort-numeric-down'></i></span></div>
                                        </a>
                                    </div>
                                </section>
                                : curr === "notice" ?
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Notice</th>
                                                <th scope="col">By</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Branch</th>
                                                <th scope="col">Year</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {teacherNotice != null && teacherNotice.map((item, pos) => item.notice.filter((a, b) => a.branch === user.branch && a.year === user.graduationYear).map((ele, ind) => <NoticeList key={ele._id} name={teacherNotice[pos].name} ind={ind} list={ele} />))}
                                        </tbody>
                                    </table>
                                    : ""}
                </div>

            </div>
        </>
    )
}
