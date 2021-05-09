import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import UserDataService from "../../services/user";
import AuthContext from "../../store/auth-context";

// Login page to log already existed user into the system

const Login = (props) => {
  const initialUserState = {
    username: "",
    password: "",
  };

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    if (!user.username) {
      alert("please enter the username");
      return;
    }

    if (!user.password) {
      alert("please enter the password");
      return;
    }

    UserDataService.login(user)
      .then((res) => {
        authCtx.login(res.data.accessToken, res.data.refreshToken);
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
        alert(err.errors[Object.keys(err.errors)[0]]);
      });
  };

  return (
    <div className="submit-form">
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

      <button
        onClick={login}
        className="btn btn-lg btn-success d-block mx-auto mt-4 px-5"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
