import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import address from "./address"
import office from "./office"

export default combineReducers({
    auth,
    message,
    address,
    office
});