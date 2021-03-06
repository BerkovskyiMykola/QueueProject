import EventBus from "../common/EventBus";
import { SET_MESSAGE } from "../constants/message";
import { EDIT_PROFILE_SUCCESS, GET_PROFILE_INFO_ERROR, GET_PROFILE_INFO_SUCCESS } from "../constants/profile";
import profileService from "../services/profile.service";

export const getUser = () => (dispatch) => {
    return profileService.getUser().then(
        (responce) => {
            dispatch({
                type: GET_PROFILE_INFO_SUCCESS,
                payload: responce.data
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: GET_PROFILE_INFO_ERROR,
            });

            return Promise.reject();
        }
    )
}

export const editUser = (name, description, firstname, lastname, dateBirth) => (dispatch) => {
    return profileService.editUser(name, description, firstname, lastname, dateBirth).then(
        (responce) => {
            dispatch({
                type: EDIT_PROFILE_SUCCESS,
                payload: { name, description, firstname, lastname, dateBirth }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_PROFILE_SUCCESS
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