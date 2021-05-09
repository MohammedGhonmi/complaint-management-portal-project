import React, { useContext } from "react";
import AuthContext from "../store/auth-context";

const Dashboard = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <h1 className="d-block mx-auto mt-4 px-5 text-center">
      Hello User: {authCtx.user ? authCtx.user.username : ""}
    </h1>
  );
};

export default Dashboard;
