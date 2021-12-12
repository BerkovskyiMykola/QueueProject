import { CREATE_USER_SUCCESS, DELETE_USER_SUCCESS, GET_USERS, GET_USER_QUEUES } from "../constants/user";

const initialState = {
    users: [],
    userQueues: {
        lastname: "",
        firstname: "",
        queues: []
    }
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: payload.users
            }
        case GET_USER_QUEUES:
            return {
                ...state,
                userQueues: payload
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                users: [...state.users, payload.user]
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.filter(x => x.userId !== payload.userId)
            }
        default:
            return state;
    }
}