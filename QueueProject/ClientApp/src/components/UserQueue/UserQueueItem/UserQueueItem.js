import React from 'react';
import { useTranslation } from 'react-i18next';

const UserQueueItem = ({ item, index }) => {
    const { officeObject, status, dateTimeCreate, dateTimeUsing, dateTimeFinish } = item;
    const { t } = useTranslation();
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{officeObject}</td>
            <td>{t(status)}</td>
            <td>{new Date(dateTimeCreate).toLocaleDateString()} {new Date(dateTimeCreate).toLocaleTimeString()}</td>
            <td>{new Date(dateTimeUsing).toLocaleDateString()} {new Date(dateTimeUsing).toLocaleTimeString()}</td>
            <td>{new Date(dateTimeFinish).toLocaleDateString()} {new Date(dateTimeFinish).toLocaleTimeString()}</td>
        </tr>
    );
}

export default UserQueueItem;