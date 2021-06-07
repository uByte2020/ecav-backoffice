import axios from "axios";
import requestURL from "./../utils/apiRequestURL";

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
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
                        "_id",
                        "name",
                        "email",
                        "role",
                        "telemovel",
                        "endereco",
                        "photo",
                        "indisponibilidade"
                    );
                    // axios.defaults.headers.common[
                    //   "Authorization"
                    // ] = `Bearer ${response.data.token}`;
                    return { user: filtedUser, token: response.data.token };
                }
            });
    }

    isLogged() {
        return axios.get(requestURL.IS_LOGGED).then((response) => {
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
                    "indisponibilidade",
                    "isBloqued"
                );
                // axios.defaults.headers.common[
                //   "Authorization"
                // ] = `Bearer ${response.data.token}`;
                return { user: filtedUser, token: response.data.token };
            }
        });
    }

    forgotPassword(email) {
        return axios.post(requestURL.FORGOT_PASSWORD, { email }).then((response) => {
            if (response.data) {
                return response.data;
            }
        });
    }

    logout() {
        return axios
            .get(requestURL.LOGOUT)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

    register(user) {
        return axios
            .post(requestURL.SIGN_UP, {
                name: user.name,
                email: user.email,
                password: user.password,
                passwordConfirm: user.passwordConfirm,
                role: user.role,
                telemovel: user.telemovel,
                endereco: user.endereco,
            })
            .then((response) => {
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
                    // axios.defaults.headers.common["Authorization"] = response.data.token;
                    return { user: filtedUser, token: response.data.token };
                }
            });
    }

    updateMe(user) {
        return axios.patch(requestURL.UPDATE_ME, user).then((response) => {
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

export default new AuthService();