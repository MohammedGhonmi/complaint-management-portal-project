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
  const [isAdmin, setIsAdmin] = React.useState(false);

  const cookies = new Cookies();


  useEffect(() => {
    // Update the document title using the browser API
    if(cookies.get('token')){
      UserDataService.isAuth({token: cookies.get('token')}).then(res=>{
        const newUser = {username: res.data.name,role: res.data.role};
        setIsAdmin(newUser.role == 'admin'? true : false); 
        setUser(newUser)
      }).catch(err=>{
        if(!(window.location.pathname == '/signup' || window.location.pathname == '/login')){
          window.location.href = "/login"
        }
        console.log(err)
      });
    }else{
      if(!(window.location.pathname == '/signup' || window.location.pathname == '/login')){
        window.location.href = "/login"
      }
    }
  },[]);

  async function login(user = null) {  

    UserDataService.login(user).then(res=>{
      cookies.set('token', res.data.accessToken);
      setUser(user);
      window.location.href = "/" ;
    }).catch(err=>{
      console.log(err)
        alert(err.message)
    });

  }

  async function signup(user = null) {  
    
    console.log(user)

    UserDataService.register(user).then(res=>{
      cookies.set('token', res.data.accessToken);
      setUser(user);
      window.location.href = "/"  
    }).catch(err=>{
      console.log(err)
      if(err.code == 11000){
        alert("User already exist")
      }else{
        if(err.errors){
          let message = "";
          if(err.errors.username){
            message += err.errors.username.path + ": " + err.errors.username.message +"\n";
          }
          if(err.errors.password){
            message += err.errors.password.path + ": " + err.errors.password.message +"\n";
          }
          alert(message)
        }    
      }
    }); 
  }

  async function logout() {
    cookies.remove('token');
    setUser(null)
    window.location.href = "/login"
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
                <strong>Logout</strong> {user.username}
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
            <Login {...props} login={login} isAdmin = {isAdmin} />
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
            <CreateComplaint {...props} isAdmin = {isAdmin}/>
          )}
        />
      </Switch>
    </div>
  </div>
  );
}

export default App;
