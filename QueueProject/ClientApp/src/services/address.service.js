import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/SuperAdmin/";

class AddressService {
    getAddresses() {
        return axios.get(API_URL + "addresses/all", { headers: authHeader() });
    }

    createAddress(country, city, street, postalCode) {
        return axios.post(API_URL + "addresses/create", { country, city, street, postalCode }, { headers: authHeader() });
    }

    deleteAddress(id) {
        return axios.delete(API_URL + "addresses/delete/" + id, { headers: authHeader() });
    }

    editAddress(addressId, country, city, street, postalCode) {
        return axios.put(API_URL + "addresses/edit", { addressId, country, city, street, postalCode }, { headers: authHeader() });
    }
}

export default new AddressService();