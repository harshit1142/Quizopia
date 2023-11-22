import React from "react";
import Home from "./Pages/Login-Signup Pages/Home";
import Login from "./Pages/Login-Signup Pages/Login";
import Signup from "./Pages/Login-Signup Pages/Signup";
import Student from "./Pages/Student/Student";
import Admin from "./Pages/Admin/Admin";
import PageNotFound from "./Pages/404/PageNotFound";
import "./App.css"
import ProtectedAdmin from "./ProtectedRoutes/ProtectAdmin";
import ProtectedStudent from "./ProtectedRoutes/ProtectStudent";
import ProtectedTeacher from "./ProtectedRoutes/ProtectTeacher";


import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Teacher from "./Pages/teacher/Teacher";
import { useState } from "react";
import { useEffect } from "react";


function App() {
 
  const [user,setUser]=useState({})

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("user")));
  },[])

  const updateUser=(user)=>{
    localStorage.setItem("user",JSON.stringify(user));
    setUser(user);
  }

  return (
    
    <>
    <BrowserRouter>
      <Switch>
       <Route exact path="/" component={Home} />
       <Route path="/login" > <Login update={updateUser} /> </Route> 
       <Route path="/signup" component={Signup} />
       <ProtectedStudent path="/student" component={Student} user={user} />
       <ProtectedAdmin path="/admin" component={Admin} user={user} />
       <ProtectedTeacher path="/teacher" component={Teacher} user={user} />
       <Route path="*" component={PageNotFound} />
      </Switch>
    </BrowserRouter>

    </>
  );
}

export default App;
