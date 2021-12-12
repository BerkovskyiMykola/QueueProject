import { CREATE_OFFICE_OBJECT_SUCCESS, DELETE_OFFICE_OBJECT_SUCCESS, EDIT_OFFICE_OBJECT_SUCCESS, GET_OFFICE_OBJECTS, GET_OFFICE_OBJECT_QUEUES } from "../constants/officeObject";

const initialState = {
    officeObjects: [],
    officeObjectQueues: {
        name: "",
        description: "",
        queues: []
    }
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_OFFICE_OBJECTS:
            return {
                ...state,
                officeObjects: payload.officeObjects
            }
        case GET_OFFICE_OBJECT_QUEUES:
            return {
                ...state,
                officeObjectQueues: payload
            }
        case CREATE_OFFICE_OBJECT_SUCCESS:
            return {
                ...state,
                officeObjects: [...state.officeObjects, payload.officeObject]
            }
        case DELETE_OFFICE_OBJECT_SUCCESS:
            return {
                ...state,
                officeObjects: state.officeObjects.filter(x => x.officeObjectId !== payload.id)
            }
        case EDIT_OFFICE_OBJECT_SUCCESS:
            return {
                ...state,
                officeObjects: state.officeObjects.map(item => {
                    if (item.officeObjectId === payload.officeObjectId)
                        return {
                            ...item,
                            name: payload.name,
                            description: payload.description,
                            max_users: payload.max_users
                        }
                    return item;
                })
            }
        default:
            return state;
    }
}