import React from 'react';
import { history } from '../../../utils/history';

const OfficeObjectItem = ({ item, index, editOfficeObject, deleteOfficeObject }) => {
	const { name, description, max_users, officeObjectId } = item;

	return (
		<tr>
			<td>{index + 1}</td>
			<td>{name}</td>
			<td>{description}</td>
			<td>{max_users}</td>
			<td>
				<button
					onClick={() => { editOfficeObject(officeObjectId, name, description, max_users) }}
					className="btn btn-outline-success btn-sm float-left">
					<i className="fa fa-edit" />
				</button>
				<button
					onClick={() => { deleteOfficeObject(officeObjectId) } }
					className="btn btn-outline-danger btn-sm float-left">
					<i className="fa fa-trash-o" />
				</button>
				<button
					onClick={() => { history.push("/officeObjectQueue/" + officeObjectId) }}
					className="btn btn-outline-info btn-sm float-left">
					<i className="fa fa-folder-open-o" />
				</button>
			</td>
		</tr>
	);
}

export default OfficeObjectItem;