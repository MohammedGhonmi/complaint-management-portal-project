import React, { useState } from "react";

// Login page to log already existed user into the system

const Login = props => {

  const initialUserState = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user)
    props.history.push('/');
  }

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.username}
            onChange={handleInputChange}
            name="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">Password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            required
            value={user.password}
            onChange={handleInputChange}
            name="password"
          />
        </div>

        <button onClick={login} className="btn btn-lg btn-success d-block mx-auto mt-4 px-5">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;