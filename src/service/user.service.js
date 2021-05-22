import axios from "axios";
import requestURL from "./../utils/apiRequestURL";

class UserService {
  getAll() {
    return axios.get(requestURL.USERS).then((response) => {
      if (response.data.data) return response.data.data.docs;
    });
  }
  createUser(user) {
    return axios.post(requestURL.USERS, user).then((response) => {
      if (response.data && response.data.data.user) {
        const filtedUser = filterObj(
          response.data.data.user,
          "_id",
          "name",
          "email",
          "role",
          "telemovel",
          "endereco",
          "photo",
          "indisponibilidade"
        );
        return filtedUser;
      }
    });
  }
}

export default new UserService();