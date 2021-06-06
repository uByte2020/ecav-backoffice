import BaseURL from "./apiBaseURL";

export default {
  LOGIN: `${BaseURL.API_URL}/users/login`,
  LOGOUT: `${BaseURL.API_URL}/users/logout`,
  UPDATE_ME: `${BaseURL.API_URL}/users/updateMe`,
  USERS: `${BaseURL.API_URL}/users`,
  PERFIS: `${BaseURL.API_URL}/perfils`,
  SIGN_UP: `${BaseURL.API_URL}/users/signup`,
  FORMACOES: `${BaseURL.API_URL}/formacoes`,
  LICOES: `${BaseURL.API_URL}/licoes`,
  MARCACOES: `${BaseURL.API_URL}/marcacoes`,
  MYMARCACOES: `${BaseURL.API_URL}/marcacoes/MyMarcacoes`,
  IS_LOGGED: `${BaseURL.API_URL}/users/isLogged`,
  FORGOT_PASSWORD: `${BaseURL.API_URL}/users/forgotPassword`,
};