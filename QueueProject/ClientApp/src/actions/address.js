import EventBus from "../common/EventBus";
import { CREATE_ADDRESS_ERROR, CREATE_ADDRESS_SUCCESS, DELETE_ADDRESS_ERROR, DELETE_ADDRESS_SUCCESS, EDIT_ADDRESS_ERROR, EDIT_ADDRESS_SUCCESS, GET_ADDRESSES } from "../constants/address";
import { SET_MESSAGE } from "../constants/message";
import addressService from "../services/address.service";

export const getAddresses = () => (dispatch) => {
    return addressService.getAddresses().then(
        (responce) => {
            dispatch({
                type: GET_ADDRESSES,
                payload: { addresses: responce.data }
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

export const editAddress = (addressId, country, city, street, postalCode) => (dispatch) => {
    return addressService.editAddress(addressId, country, city, street, postalCode).then(
        (responce) => {
            dispatch({
                type: EDIT_ADDRESS_SUCCESS,
                payload: { addressId, country, city, street, postalCode }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_ADDRESS_ERROR
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

export const createAddress = (country, city, street, postalCode) => (dispatch) => {
    return addressService.createAddress(country, city, street, postalCode).then(
        (responce) => {
            dispatch({
                type: CREATE_ADDRESS_SUCCESS,
                payload: { address: responce.data }
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

export const deleteAddress = (id) => (dispatch) => {
    return addressService.deleteAddress(id).then(
        (responce) => {
            dispatch({
                type: DELETE_ADDRESS_SUCCESS,
                payload: { id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_ADDRESS_ERROR
            });

            return Promise.reject();
        }
    )
}