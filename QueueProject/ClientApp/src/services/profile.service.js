import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Admin/";

class ProfileService {

    getUser() {
        return axios.get(API_URL + "profile/get", { headers: authHeader() });
    }

    editUser(name, description, firstname, lastname, dateBirth) {
        return axios.put(API_URL + "profile/edit", { name, description, firstname, lastname, dateBirth }, { headers: authHeader() });
    }
}

export default new ProfileService();