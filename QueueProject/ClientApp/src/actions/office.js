import EventBus from "../common/EventBus";
import { CREATE_ADDRESS_ERROR } from "../constants/address";
import { SET_MESSAGE } from "../constants/message";
import { CREATE_OFFICE_SUCCESS, DELETE_OFFICE_SUCCESS, GET_OFFICES_SUCCESS } from "../constants/office";
import officeService from "../services/office.service";

export const getOffices = (id) => (dispatch) => {
    return officeService.getOffices(id).then(
        (responce) => {
            dispatch({
                type: GET_OFFICES_SUCCESS,
                payload: responce.data
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            return Promise.reject();
        }
    )
}

export const createOffice = (name, description, addressId, lastname, firstname, email, password) => (dispatch) => {
    return officeService.createOffice(name, description, addressId, lastname, firstname, email, password).then(
        (responce) => {
            dispatch({
                type: CREATE_OFFICE_SUCCESS,
                payload: { office: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_ADDRESS_ERROR
            });

            const message = error.response.data.title || error.response.data;

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}

export const deleteOffice = (id) => (dispatch) => {
    return officeService.deleteOffice(id).then(
        (responce) => {
            dispatch({
                type: DELETE_OFFICE_SUCCESS,
                payload: { id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_OFFICE_SUCCESS
            });

            return Promise.reject();
        }
    )
}