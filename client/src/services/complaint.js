import http from "../http-common";


// create a client service for the complaint to perform the CRUD operations
class ComplaintDataService {
  getAll(token) {
    return http.get(`/complains`, {
      headers: {
        authorization: 'bearer ' + token      
      }
    });
  }

  get(complaintId, token) {
    return http.get(`/complains/${complaintId}`, {
      headers: {
        authorization: 'bearer ' + token      
      }
    });
  }

  createComplaint(data, token) {
    return http.post("/complains", data, {
      headers: {
        authorization: 'bearer ' + token      
      }
    });
  }

  editComplaint(complaintId, data, token) {
    return http.put(`/complains/${complaintId}`, data, {
      headers: {
        authorization: 'bearer ' + token
      }
    });
  }
}

export default new ComplaintDataService();
