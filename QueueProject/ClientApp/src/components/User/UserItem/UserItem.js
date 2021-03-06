import React from 'react';
import { history } from '../../../utils/history';

const UserItem = ({ item, index, deleteUser }) => {
    const { firstname, lastname, email, dateBirth, userId } = item;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{email}</td>
            <td>{new Date(dateBirth).toLocaleDateString()}</td>
            <td>
                <button
                    onClick={() => { deleteUser(userId) } }
                    className="btn btn-outline-danger btn-sm float-left">
                    <i className="fa fa-trash-o" />
                </button>
                <button
                    onClick={() => { history.push("/userQueue/" + userId) }}
                    className="btn btn-outline-info btn-sm float-left">
                    <i className="fa fa-folder-open-o" />
                </button>
            </td>
        </tr>
    );
}

export default UserItem;