import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Admin/";

class UserService {
    getUsers() {
        return axios.get(API_URL + "users/all", { headers: authHeader() });
    }

    createUser(lastname, firstname, email, password) {
        return axios.post(API_URL + "users/create", { lastname, firstname, email, password }, { headers: authHeader() });
    }

    deleteUser(id) {
        return axios.delete(API_URL + "users/delete/" + id, { headers: authHeader() });
    }
}

export default new UserService();