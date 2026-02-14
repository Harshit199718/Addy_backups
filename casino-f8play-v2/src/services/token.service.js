class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refresh;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.access;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.access = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  updateLocalRefreshToken(refresh) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.refresh = refresh;
    localStorage.setItem("user", JSON.stringify(refresh));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }

  // setRegisterUserId(userId) {
  //   localStorage.setItem("registerUserId", JSON.stringify(userId));
  // }

  // getRegisterUserId() {
  //   return JSON.parse(localStorage.getItem("registerUserId"));
  // }

  // setRegisterUser(user) {
  //   localStorage.setItem("registerUser", JSON.stringify(user));
  // }

  // getRegisterUser() {
  //   return JSON.parse(localStorage.getItem("registerUser"));
  // }

  // removeRegisterUser(user) {
  //   localStorage.removeItem("registerUser");
  // }
}

const tokenService = new TokenService();
export default tokenService;
