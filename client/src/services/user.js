import http from "../http-common";

// create a client service for the user to perform the CRUD operations
class UserDataService {
  getCurrentUser() {
    return http.get("users/getCurrentUser", {
      headers: {
        "x-token": localStorage.getItem("token"),
        "x-refresh-token": localStorage.getItem("refreshToken"),
      },
    });
  }

  login(data) {
    return http.post("users/login", data);
  }

  register(data) {
    return http.post("users/register", data);
  }
}

export default new UserDataService();
