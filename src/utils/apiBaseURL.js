const NODE_ENV = "prd";
const url = NODE_ENV === "prd" ? "" : "http://localhost:3000";

export default {
  SERVER_URL: url,
  API_URL: `${url}/api/v1`,
};
