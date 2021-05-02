import React from "react";

const Dashboard = props => {

    return (
      <h1 className="d-block mx-auto mt-4 px-5 text-center">
            Hello User { props.user ? props.user.username : ''}
      </h1>
    );
  };
  
  export default Dashboard;