import axios from "axios";
import requestURL from "./../utils/apiRequestURL";

class AuthService {
  login({ email, password }) {
    return axios
      .post(requestURL.LOGIN, { email, password })
      .then((response) => {
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            axios.defaults.headers.common['Authorization'] = response.data.token;
          return response.data;
        }
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();