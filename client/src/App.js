import React, { useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateComplaint from "./components/create-complaint";
import Restaurant from "./components/complaint";
import ComplaintsList from "./components/complaints-list";
import Login from "./components/login";
import UserDataService from "./services/user";
import Register from "./components/register";
import Cookies from 'universal-cookie';
import Dashboard from './components/dashboard';

// Home app js <3

function App() {

  const [user, setUser] = React.useState(null);
  const cookies = new Cookies();

  async function login(user = null) {  

    UserDataService.login(user).then(res=>{
      cookies.set('token', res.data.accessToken);
    }).catch(err=>{
      console.log(err)
    });

    setUser(user);
  }

  async function signup(user = null) {  
    
  console.log(user)

    UserDataService.register(user).then(res=>{
      cookies.set('token', res.data.accessToken);
    }).catch(err=>{
      console.log(err.error)
    });

    setUser(user);
  }

  async function logout() {

    cookies.remove('token');

    setUser(null)
  }

  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/complaints" className="navbar-brand">
        Compliant Management Portal
      </a>
      <div className="navbar-nav mr-auto">
          { user ? (
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/complaints"} className="nav-link">
                  Complaints
                </Link>
              </li>
            <li className="nav-item">
              <Link to={"/createcomplaint"} className="nav-link">
                Create-Complaint
              </Link>
            </li>
            <li className="nav-item">
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.username}
              </a>
            </li>
          </div>  
          ) : (
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
        
      </div>
    </nav>

    <div className="container mt-3">
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path={["/complaints"]} component={ComplaintsList} />
        <Route 
          path="/complaints/:id"
          render={(props) => (
            <Restaurant {...props} user={user} />
          )}
        />
        <Route 
          path="/login"
          render={(props) => (
            <Login {...props} login={login} />
          )}
        />
        <Route 
          path="/signup"
          render={(props) => (
            <Register {...props} signup={signup} />
          )}
        />
        <Route 
          exact
          path="/createcomplaint"
          render={(props) => (
            <CreateComplaint {...props} />
          )}
        />
      </Switch>
    </div>
  </div>
  );
}

export default App;
