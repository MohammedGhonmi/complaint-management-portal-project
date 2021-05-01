import React, { useState } from "react";
import ComplaintDataService from "../services/complaint";
import Cookies from 'universal-cookie';

//Create a new complaint

const CreateComplaint = props => {

  const initialComplaintState = {
    title: "",
    description: "",
    status:"pending"
  };

  const cookies = new Cookies();

  console.log(cookies.get('token'));


  const [complaint, setComplaint] = useState(initialComplaintState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setComplaint({ ...complaint, [name]: value });
  };

  const create = () => {
    console.log(complaint)
    console.log(complaint,cookies.get('token'))

    ComplaintDataService.createComplaint(complaint,cookies.get('token'))
    .then(response => {
      console.log(response.data);
      setComplaint(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  return ( 
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            value={complaint.username}
            onChange={handleInputChange}
            name="title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            required
            value={complaint.description}
            onChange={handleInputChange}
            name="description"
            rows="5"
          />
        </div>
        <button style={{marginTop:20+"px"}} onClick={create} className="btn btn-success">
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateComplaint;