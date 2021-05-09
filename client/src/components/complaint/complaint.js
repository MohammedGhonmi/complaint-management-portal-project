import React, { useState, useEffect, useContext } from "react";
import ComplaintDataService from "../../services/complaint";
import AuthContext from "../../store/auth-context";

//Complaint page to show one complaint at a time

const Complaint = (props) => {
  const initialComplaintState = {
    _id: null,
    title: "",
    description: "",
    status: "",
  };

  const authCtx = useContext(AuthContext);
  const [complaint, setComplaint] = useState(initialComplaintState);

  const getComplaint = (id) => {
    ComplaintDataService.get(id)
      .then((response) => {
        setComplaint(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setComplaint({ ...complaint, [name]: value });
  };

  const onSubmit = () => {
    ComplaintDataService.editComplaint(props.match.params.id, {
      status: complaint.status,
    })
      .then((response) => {
        setComplaint(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    props.history.push("/complaints");
  };

  useEffect(() => {
    getComplaint(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div className="submit-form">
      <div>
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            readonly
            class="form-control"
            id="title"
            value={complaint.title}
            disabled
          />
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
          <select
            class="form-control"
            name="status"
            id="status"
            onChange={handleInputChange}
            value={complaint.status}
            disabled={!authCtx.isAdmin}
          >
            <option value="resolved">Resolved</option>
            <option value="pending">Pending</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>
        <button
          onClick={onSubmit}
          className="btn btn-lg btn-success d-block mx-auto mt-4 px-5"
          disabled={!authCtx.isAdmin}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Complaint;
