import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CreateComplaint from "./components/complaint/create-complaint";
import Complaint from "./components/complaint/complaint";
import ComplaintsList from "./components/complaint/complaints-list";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Dashboard from "./components/dashboard";
import Layout from "./components/layout/layout";
import AuthContext from "./store/auth-context";
import "bootstrap/dist/css/bootstrap.min.css";

// Home app js <3

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        {authCtx.user && <Route exact path="/" component={Dashboard} />}
        {authCtx.user && (
          <Route exact path="/complaints" component={ComplaintsList} />
        )}
        {authCtx.user && (
          <Route
            path="/complaints/:id"
            render={(props) => <Complaint {...props} />}
          />
        )}
        {!authCtx.isAdmin && authCtx.user && (
          <Route
            path="/createcomplaint"
            render={(props) => <CreateComplaint {...props} />}
          />
        )}
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
