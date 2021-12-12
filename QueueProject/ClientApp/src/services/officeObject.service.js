import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Admin/";

class OfficeObjectService {
    getOfficeObjects() {
        return axios.get(API_URL + "OfficeObjects/all", { headers: authHeader() });
    }

    createOfficeObject(name, description, max_users) {
        return axios.post(API_URL + "OfficeObjects/create", { name, description, max_users }, { headers: authHeader() });
    }

    editOfficeObject(officeObjectId, name, description, max_users) {
        return axios.put(API_URL + "OfficeObjects/edit", { officeObjectId, name, description, max_users }, { headers: authHeader() });
    }

    deleteOfficeObject(id) {
        return axios.delete(API_URL + "OfficeObjects/delete/" + id, { headers: authHeader() });
    }
}

export default new OfficeObjectService();