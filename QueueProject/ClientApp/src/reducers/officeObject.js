import { CREATE_OFFICE_OBJECT_SUCCESS, DELETE_OFFICE_OBJECT_SUCCESS, EDIT_OFFICE_OBJECT_SUCCESS, GET_OFFICE_OBJECTS } from "../constants/officeObject";

const initialState = {
    officeObjects: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_OFFICE_OBJECTS:
            return {
                officeObjects: payload.officeObjects
            }
        case CREATE_OFFICE_OBJECT_SUCCESS:
            return {
                officeObjects: [...state.officeObjects, payload.officeObject]
            }
        case DELETE_OFFICE_OBJECT_SUCCESS:
            return {
                officeObjects: state.officeObjects.filter(x => x.officeObjectId !== payload.id)
            }
        case EDIT_OFFICE_OBJECT_SUCCESS:
            return {
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