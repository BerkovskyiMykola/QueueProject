import React from 'react';

const AddressItem = ({ item, index, editAddress, deleteAddress }) => {
    const { country, city, street, postalCode, addressId } = item;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{country}</td>
            <td>{city}</td>
            <td>{street}</td>
            <td>{postalCode}</td>
            <td>
                <button
                    onClick={() => { editAddress(addressId, country, city, street, postalCode) }}
                    className="btn btn-outline-success btn-sm float-left">
                    <i className="fa fa-edit" />
                </button>
                <button
                    onClick={() => { deleteAddress(addressId) } }
                    className="btn btn-outline-danger btn-sm float-left">
                    <i className="fa fa-trash-o" />
                </button>
            </td>
        </tr>
    );
}

export default AddressItem;