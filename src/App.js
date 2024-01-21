import React from "react";
import Home from "./Pages/Login-Signup Pages/Home";
import Login from "./Pages/Login-Signup Pages/Login";
import Signup from "./Pages/Login-Signup Pages/Signup";
import Student from "./Pages/Student/Student";
import Admin from "./Pages/Admin/Admin";
import PageNotFound from "./Pages/404/PageNotFound";
import "./App.css"


import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Teacher from "./Pages/teacher/Teacher";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./Redux/UserRedux";
import QuizWindow from "./Pages/QuizWindow/QuizWindow";
import { setQuiz } from "./Redux/QuizRedux";
import { setAllQuiz } from "./Redux/AllQuizRedux";
import LeaderBoard from "./Pages/Ranking/LeaderBoard";
import { setRanking } from "./Redux/RankingRedux";


function App() {
  const dispatch = useDispatch();
  const [user, setUserState] = useState({ role: "", email: "", password: "" })


  useEffect(() => {
    if (localStorage.getItem('user')) {
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    }
    if (localStorage.getItem('quiz')) {
      dispatch(setQuiz(JSON.parse(localStorage.getItem("quiz"))));
    }
    if (localStorage.getItem('allQuiz')) {
      dispatch(setAllQuiz(JSON.parse(localStorage.getItem("allQuiz"))));
    }
    if (localStorage.getItem('ranking')) {
      dispatch(setRanking(JSON.parse(localStorage.getItem("ranking"))));
    }

  }, [])


  return (

    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" > <Login /> </Route>
          <Route path="/signup" component={Signup} />
          <Route path="/student" component={Student} />
          <Route path="/admin" component={Admin} />
          <Route path="/teacher" component={Teacher} />
          <Route path="/quiz" component={QuizWindow} />
          <Route path="/ranking" component={LeaderBoard} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>

    </>
  );
}

export default App;
