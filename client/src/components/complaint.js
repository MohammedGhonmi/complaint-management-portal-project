import React, { useState, useEffect } from "react";
import ComplaintDataService from "../services/complaint";
import Cookies from 'universal-cookie';

//Complaint page to show one complaint at a time

const Complaint = props => {
  const initialComplaintState = {
    _id: null,
    title: "",
    description: "",
    status: ""
  };

  const [complaint, setComplaint] = useState(initialComplaintState);
  const cookies = new Cookies();

  const getComplaint = id => {
    ComplaintDataService.get(id,cookies.get('token'))
      .then(response => {
        setComplaint(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setComplaint({ ...complaint, [name]: value });
  };

  const onSubmit = () => {
    console.log(complaint,props.match.params.id)
    ComplaintDataService.editComplaint(props.match.params.id,{status: complaint.status},cookies.get('token'))
      .then(response => {
        setComplaint(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

    props.history.push('/complaints');
  }

  useEffect(() => {
    getComplaint(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div className="submit-form">
      <div>
        <div class="form-group">
          <label for="title" >Title</label>
            <input 
              type="text" 
              readonly
              class="form-control"
              id="title" 
              value={complaint.title} disabled  />
        </div>
        <div class="form-group">
          <label for="inputPassword">Description</label>
            <textarea 
              readonly
              class="form-control" 
              id="inputPassword" 
              placeholder="Password"
              rows="5"
              value={complaint.description}
              disabled
            ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select class="form-control" name="status" id="status" onChange={handleInputChange} value={complaint.status}>
            <option value="resolved">Resolved</option>
            <option value="pending">Pending</option>
            <option value="dismissed">Dismissed</option>
        </select>
        </div>
        <button onClick={onSubmit} className="btn btn-lg btn-success d-block mx-auto mt-4 px-5">
          Save
        </button>
      </div>
    </div>
  );
};

export default Complaint;