import React from "react";
import Home from "./Pages/Login-Signup Pages/Home";
import Login from "./Pages/Login-Signup Pages/Login";
import Signup from "./Pages/Login-Signup Pages/Signup";

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    
    <>
    <BrowserRouter>
      <Switch>
       <Route exact path="/" component={Home} />
       <Route path="/login" component={Login} />
       <Route path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>

    </>
  );
}

export default App;
