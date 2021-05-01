import http from "../http-common";


// create a client service for the user to perform the CRUD operations
class UserDataService {

  isAuth(data) {
    return http.post("users/isauth", data);
  }

  login(data) {
    return http.post("users/login", data);
  }

  register(data) {
    return http.post("users/register", data);
  }
}

export default new UserDataService();
