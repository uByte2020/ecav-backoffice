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
            localStorage.setItem("user", JSON.stringify(filtedUser));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            axios.defaults.headers.common['Authorization'] = response.data.token;
          return filtedUser;
        }
      });
  }

  logout() {
    return new Promise((resolve, reject) => {
      axios
        .get(requestURL.LOGOUT)
        .then((response) => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          resolve(response);
        })
        .catch((error) => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          reject(error);
        });
    });
  }

  register(user) {
    return axios.post(requestURL.SIGN_UP, {
      name: user.name,
      email: user.email,
      password: user.password,
      passwordConfirm: user.passwordConfirm, 
      role: user.role, 
      telemovel: user.telemovel, 
      endereco: user.endereco, 
    }).then((response) => {
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
          localStorage.setItem("user", JSON.stringify(filtedUser));
          localStorage.setItem("token", JSON.stringify(response.data.token));
          axios.defaults.headers.common['Authorization'] = response.data.token;
        return filtedUser;
      }
    });
  }
}

export default new AuthService();