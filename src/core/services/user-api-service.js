import axios from "axios";
import autHeader from "./auth-header.json";

const API_URL = "https://web-services-whiterepair.azurewebsites.net/api/v1/users";

class UserApiService {
    getAll() {
        console.log(autHeader())
        return axios.get(API_URL, { headers: autHeader() });
    }
}

export default new UserApiService();