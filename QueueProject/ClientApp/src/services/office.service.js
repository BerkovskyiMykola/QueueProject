import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/SuperAdmin/";

class OfficeService {
    getOffices(id) {
        return axios.get(API_URL + "offices/all/" + id, { headers: authHeader() });
    }

    createOffice(name, description, addressId, lastname, firstname, email, password) {
        return axios.post(API_URL + "offices/create", { name, description, addressId, lastname, firstname, email, password }, { headers: authHeader() });
    }

    deleteOffice(id) {
        return axios.delete(API_URL + "offices/delete/" + id, { headers: authHeader() });
    }
}

export default new OfficeService();