import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
      "Content-type": "application/json"
    }
  });

  instance.interceptors.response.use(function (response) {
    return response
   }, function(error) {
    if (error.response.status === 401) {
     window.location.href = "/login"
    }
    return Promise.reject(error.response.data)
   })

export default instance;