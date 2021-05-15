import axios from "axios";
import requestURL from "./../utils/apiRequestURL";

class UserService {
  getAll() {
    return axios.get(requestURL.USERS).then(
        (response) => {
          if (response.data.data)
          return response.data.data.docs;
        }
      );
  };
}

export default new UserService();