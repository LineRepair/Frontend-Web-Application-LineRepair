import axios from "axios";

const API_URL = "https://web-services-whiterepair.azurewebsites.net/api/v1/users/auth/";

class AuthService {
    login(user) {
        return axios.post(API_URL + "sign-in", JSON.stringify({
                email: user.email,
                password: user.password }),
                {headers: {'Content-Type': 'application/json'}}
            )
            .then(response => {
                if (response.data.token) {
                    console.log("user:" + response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(user) {
        return axios.post(API_URL + "sign-up", {
                email: user.email,
                password: user.password
            });
    }
}

export default new AuthService();