import { CREATE_USER_SUCCESS, DELETE_USER_SUCCESS, GET_USERS } from "../constants/user";

const initialState = {
    users: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS:
            return {
                users: payload.users
            }
        case CREATE_USER_SUCCESS:
            return {
                users: [...state.users, payload.user]
            }
        case DELETE_USER_SUCCESS:
            return {
                users: state.users.filter(x => x.userId !== payload.userId)
            }
        default:
            return state;
    }
}