import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import UserDataService from "../../services/user";
import AuthContext from "../../store/auth-context";

// signup page to create a new user

const Register = (props) => {
  const initialUserState = {
    username: "",
    password: "",
    role: "admin",
  };

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const signup = () => {
    UserDataService.register(user)
      .then((res) => {
        console.log(res.data);
        authCtx.login(res.data.accessToken, res.data.refreshToken);
        history.replace("/");
      })
      .catch((err) => {
        let error = "";
        Object.keys(err.errors).forEach((key) => {
          error += `${err.errors[key]}\n`;
        });
        alert(error);
      });
  };

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
        <div className="form-group">
          <label htmlFor="id">Role</label>
          <select
            class="form-control"
            name="role"
            id="role"
            onChange={handleInputChange}
            value={user.role}
          >
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        <button
          style={{ marginTop: 20 + "px" }}
          onClick={signup}
          className="btn btn-lg btn-success d-block mx-auto mt-4 px-5"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
