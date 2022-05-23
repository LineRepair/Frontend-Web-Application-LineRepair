import axios from "axios";
import autHeader from "./auth-header.json";

const API_URL = "https://web-services-ielectric20220522173612.azurewebsites.net/api/v1/users";

class UserApiService {
    getAll() {
        console.log(autHeader())
        return axios.get(API_URL, { headers: autHeader() });
    }
}

export default new UserApiService();