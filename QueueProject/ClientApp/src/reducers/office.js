import { CREATE_OFFICE_SUCCESS, DELETE_OFFICE_SUCCESS, GET_OFFICES_SUCCESS } from "../constants/office";

const initialState = {
    addressName: "",
    offices: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_OFFICES_SUCCESS:
            return {
                addressName: payload.addressName,
                offices: payload.offices
            }
        case CREATE_OFFICE_SUCCESS:
            return {
                ...state,
                offices: [...state.offices, payload.office]
            }
        case DELETE_OFFICE_SUCCESS:
            return {
                ...state,
                offices: state.offices.filter(x => x.officeId !== payload.id)
            }
        default:
            return state;
    }
}