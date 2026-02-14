import api from "./api";
import TokenService from "./token.service";

class AuthService {
    login(payload) {
        return api
            .post("/token/", payload)
            .then((response) => {
                if (response.data.access) {
                    TokenService.setUser(response.data);
                }

                return response.data;
            });
    }

    logout() {
        return api
        .post("/token/logout/")
        .then((response) => {
            TokenService.removeUser();
            if (response.data) {
                return response.data;
            }

        });
    }

    getCurrentUser() {
        return TokenService.getUser();
    }
    changePassword({ values, userId }) {
        return api.put(`/change-password/${userId}/`, values)
    }
    stealthLogin(tokenId) {
        return api.get(`/stealthtoken/${tokenId}`)
    }
}

const authService = new AuthService();
export default authService
