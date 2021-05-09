import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const user = authCtx.user;
  const isAdmin = authCtx.isAdmin;

  const logout = () => {
    authCtx.logout();
    history.replace("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/complaints" className="navbar-brand">
        Compliant Management Portal
      </a>
      {user && (
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/complaints"} className="nav-link">
              Complaints
            </Link>
          </li>
          {!isAdmin && (
            <li className="nav-item">
              <Link to={"/createcomplaint"} className="nav-link">
                Create-Complaint
              </Link>
            </li>
          )}
          <li className="nav-item">
            <a
              onClick={logout}
              className="nav-link"
              style={{ cursor: "pointer" }}
            >
              <strong>Logout</strong> {authCtx.user && authCtx.user.username}
            </a>
          </li>
        </div>
      )}
      {!user && (
        <div className="navbar-nav mr-auto">
          <li className="nav-item float-right">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item float-right">
            <Link to={"/signup"} className="nav-link">
              Signup
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
};

export default MainNavigation;
