import { CREATE_ADDRESS_SUCCESS, DELETE_ADDRESS_SUCCESS, EDIT_ADDRESS_SUCCESS, GET_ADDRESSES } from "../constants/address";

const initialState = {
    addresses: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ADDRESSES:
            return {
                addresses: payload.addresses
            }
        case CREATE_ADDRESS_SUCCESS:
            return {
                addresses: [...state.addresses, payload.address]
            }
        case DELETE_ADDRESS_SUCCESS:
            return {
                addresses: state.addresses.filter(x => x.addressId !== payload.id)
            }
        case EDIT_ADDRESS_SUCCESS:
            return {
                addresses: state.addresses.map(item => {
                    if (item.addressId === payload.addressId)
                        return {
                            ...item,
                            country: payload.country,
                            city: payload.city,
                            street: payload.street,
                            postalCode: payload.postalCode
                        }
                    return item;
                })
            }
        default:
            return state;
    }
}