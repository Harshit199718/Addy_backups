import axios from "axios";
import TokenService from "./token.service";

const API_URL = process.env.REACT_APP_APIURL;
const backEnd = API_URL + "/app/api";

const instance = axios.create({
  baseURL: backEnd,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let refreshExpired = false;

instance.interceptors.response.use(
  (res) => {
    refreshExpired = false;
    return res;
  },
  async (err) => {

    const originalConfig = err.config;
    if (originalConfig.url !== "/signin" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !refreshExpired) {
        refreshExpired = true;
        if (TokenService.getLocalRefreshToken()) {
          const rs = await instance.post("/token/refresh/", {
            refresh: TokenService.getLocalRefreshToken(),
          });

          const { access } = rs.data;

          TokenService.updateLocalAccessToken(access);

          return instance(originalConfig);
        }
      } else if (
        originalConfig.url === "/token/refresh/" &&
        err.response.status === 401 &&
        refreshExpired
      ) {
        refreshExpired = false;
        window.location.href = "/signin";
        TokenService.removeUser();
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
