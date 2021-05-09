import React, { useState } from "react";
import ComplaintDataService from "../../services/complaint";

//Create a new complaint

const CreateComplaint = (props) => {
  const initialComplaintState = {
    title: "",
    description: "",
    status: "pending",
  };

  const [complaint, setComplaint] = useState(initialComplaintState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setComplaint({ ...complaint, [name]: value });
  };

  const create = () => {
    ComplaintDataService.createComplaint(complaint)
      .then((response) => {
        setComplaint(response.data);
        props.history.push("/complaints");
      })
      .catch((err) => {
        console.log(err);
        alert(err.errors[Object.keys(err.errors)[0]]);
      });
  };

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
            disabled={props.isAdmin}
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
            disabled={props.isAdmin}
          />
        </div>
        <button
          style={{ marginTop: 20 + "px" }}
          onClick={create}
          className="btn btn-lg btn-success d-block mx-auto mt-4 px-5"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateComplaint;
