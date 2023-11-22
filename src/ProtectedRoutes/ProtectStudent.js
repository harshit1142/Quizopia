import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedStudent = ({ user, component: Component, ...rest }) => {
     const auth=(user.role==="student")?true:false;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) return <Component {...props} />;
        if (!auth)
          return (
            <Redirect to={{ path: "/", state: { from: props.location } }} />
          );
      }}
    />
  );
};

export default ProtectedStudent;