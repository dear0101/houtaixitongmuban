import axios from "axios";

axios.defaults.timeout = 30000;
axios.defaults.withCredentials = true;
if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = "/idms/api";
}

export default axios;
