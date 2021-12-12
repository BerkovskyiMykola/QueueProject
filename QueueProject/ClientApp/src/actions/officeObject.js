import EventBus from "../common/EventBus";
import { SET_MESSAGE } from "../constants/message";
import { CREATE_OFFICE_OBJECT_ERROR, CREATE_OFFICE_OBJECT_SUCCESS, DELETE_OFFICE_OBJECT_ERROR, DELETE_OFFICE_OBJECT_SUCCESS, EDIT_OFFICE_OBJECT_ERROR, EDIT_OFFICE_OBJECT_SUCCESS, GET_OFFICE_OBJECTS } from "../constants/officeObject";
import officeObjectService from "../services/officeObject.service";

export const getOfficeObjects = () => (dispatch) => {
    return officeObjectService.getOfficeObjects().then(
        (responce) => {
            dispatch({
                type: GET_OFFICE_OBJECTS,
                payload: { officeObjects: responce.data }
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

export const createOfficeObject = (name, description, max_users) => (dispatch) => {
    return officeObjectService.createOfficeObject(name, description, max_users).then(
        (responce) => {
            dispatch({
                type: CREATE_OFFICE_OBJECT_SUCCESS,
                payload: { officeObject: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_OFFICE_OBJECT_ERROR
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

export const editOfficeObject = (officeObjectId, name, description, max_users) => (dispatch) => {
    return officeObjectService.editOfficeObject(officeObjectId, name, description, max_users).then(
        (responce) => {
            dispatch({
                type: EDIT_OFFICE_OBJECT_SUCCESS,
                payload: { officeObjectId, name, description, max_users }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_OFFICE_OBJECT_ERROR
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

export const deleteOfficeObject = (id) => (dispatch) => {
    return officeObjectService.deleteOfficeObject(id).then(
        (responce) => {
            dispatch({
                type: DELETE_OFFICE_OBJECT_SUCCESS,
                payload: { id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_OFFICE_OBJECT_ERROR
            });

            return Promise.reject();
        }
    )
}