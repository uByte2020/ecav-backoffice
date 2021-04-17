import axios from "axios";
import requestURL from "./../utils/apiRequestURL";

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

class AuthService {
  login({ email, password }) {
    return axios
      .post(requestURL.LOGIN, { email, password })
      .then((response) => {
        if (response.data && response.data.data.user) {
          const filtedUser = filterObj(
              response.data.data.user,
              'name',
              'email',
              'role',
              'telemovel',
              'endereco',
              'photo'
            );
            console.log(filtedUser)
            localStorage.setItem("user", JSON.stringify(filtedUser));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            axios.defaults.headers.common['Authorization'] = response.data.token;
          return filtedUser;
        }
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
}

export default new AuthService();