import React, { useState, useEffect, useContext } from "react";
import ComplaintDataService from "../../services/complaint";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

//Complaint list page to show all the complaints related to
//the user or all the complaints if the user was an admin

const ComplaintsList = (props) => {
  const authCtx = useContext(AuthContext);
  const [compliants, setCompliants] = useState([]);

  useEffect(() => {
    retrieveComplaints();
  }, []);

  const retrieveComplaints = () => {
    ComplaintDataService.getAll()
      .then((response) => {
        setCompliants(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="row">
        {compliants.map((complaint) => {
          return (
            <div key={complaint._id} className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <strong>Title: </strong>
                    {complaint.title}
                  </h5>
                  <p className="card-text">
                    <strong>Description: </strong>
                    {complaint.description}
                    <br />
                    <strong>Status: </strong>
                    {complaint.status}
                    <br />
                  </p>
                  <div className="row">
                    <Link
                      to={"/complaints/" + complaint._id}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComplaintsList;
