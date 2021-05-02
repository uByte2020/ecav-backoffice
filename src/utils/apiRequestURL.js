import BaseURL from "./apiBaseURL";

export default {
  LOGIN: `${BaseURL.API_URL}/users/login`,
  LOGOUT: `${BaseURL.API_URL}/users/logout`,
  SIGN_UP: `${BaseURL.API_URL}/users/signup`,
  FORMACOES: `${BaseURL.API_URL}/formacoes`,
  LICOES: `${BaseURL.API_URL}/licoes`,
  MARCACOES: `${BaseURL.API_URL}/marcacoes`,
  MYMARCACOES:  `${BaseURL.API_URL}/marcacoes/MyMarcacoes`,
};