import decodeToken from "jwt-decode";
// import moment from "moment";
import history from "./history";

class Auth {
  handleResponse(response) {
    const encodedToken = response.data.access_token;
    localStorage.setItem("access_token", encodedToken);
    history.replace("/");
  }

  getAccessToken() {
    return localStorage.getItem("access_token");
  }

  // hasTokenExpired(encodedToken) {
  //   const exp = moment.unix(decodeToken(encodedToken).exp);
  //   const now = moment();
  //   const secondsUntilExp = exp.diff(now, "seconds");
  //   console.log("secondsUntilExp", secondsUntilExp);
  //   return secondsUntilExp <= 0;
  // }

  get userId() {
    const encodedToken = this.getAccessToken();
    const { sub } = decodeToken(encodedToken);
    return sub;
  }

  isAuthorized() {
    const token = localStorage.getItem("access_token");
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}

export default new Auth();
