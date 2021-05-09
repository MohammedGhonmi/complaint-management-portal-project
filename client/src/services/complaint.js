import http from "../http-common";

// create a client service for the complaint to perform the CRUD operations
class ComplaintDataService {
  getAll() {
    return http.get(`/complains`, {
      headers: {
        "x-token": localStorage.getItem("token"),
        "x-refresh-token": localStorage.getItem("refreshToken"),
      },
    });
  }

  get(complaintId) {
    return http.get(`/complains/${complaintId}`, {
      headers: {
        "x-token": localStorage.getItem("token"),
        "x-refresh-token": localStorage.getItem("refreshToken"),
      },
    });
  }

  createComplaint(data) {
    return http.post("/complains", data, {
      headers: {
        "x-token": localStorage.getItem("token"),
        "x-refresh-token": localStorage.getItem("refreshToken"),
      },
    });
  }

  editComplaint(complaintId, data) {
    return http.put(`/complains/${complaintId}`, data, {
      headers: {
        "x-token": localStorage.getItem("token"),
        "x-refresh-token": localStorage.getItem("refreshToken"),
      },
    });
  }
}

export default new ComplaintDataService();
