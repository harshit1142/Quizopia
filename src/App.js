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


function App() {
  return (
    
    <>
    <BrowserRouter>
      <Switch>
       <Route exact path="/" component={Home} />
       <Route path="/login" component={Login} />
       <Route path="/signup" component={Signup} />
       <Route path="/student" component={Student} />
       <Route path="/admin" component={Admin} />
       <Route path="/teacher" component={Teacher} />
       <Route path="*" component={PageNotFound} />
      </Switch>
    </BrowserRouter>

    </>
  );
}

export default App;
