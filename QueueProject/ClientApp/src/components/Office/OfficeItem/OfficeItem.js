import React from 'react';

const OfficeItem = ({ item, index, deleteOffice, getFields }) => {
    const { name, description, admin, addressId, officeId } = item;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>
                <button
                    onClick={() => { deleteOffice(officeId) }}
                    className="btn btn-outline-danger btn-sm float-left">
                    <i className="fa fa-trash-o" />
                </button>
                <button
                    onClick={() => { getFields(name, description, admin.lastname, admin.firstname, admin.email) }}
                    className="btn btn-outline-info btn-sm float-left">
                    <i className="fa fa-info" />
                </button>
            </td>
            
           
        </tr>
    );
}

export default OfficeItem;