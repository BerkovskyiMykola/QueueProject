import React from 'react'
import {  useTranslation } from 'react-i18next';
import { Table, Container, Row, Col } from "reactstrap";
import UserItem from '../UserItem/UserItem';

const UserList = ({ users, deleteUser }) => {

    const { t } = useTranslation();

    if (users.length === 0) {
        return (
            <Container style={{ backgroundColor: "#F2F2F2" }}>
                <Row className="text-center">
                    <Col className="col-12 my-5"><h2>{t("ListEmpty")}</h2></Col>
                </Row>
            </Container>
        );
    }

    return (
        <Table style={{ marginTop: '5px' }} dark>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t("Firsname")}</th>
                    <th>{t("Lastname")}</th>
                    <th>{t("Email")}</th>
                    <th>{t("DateBirth")}</th>
                    <th>{t("Actions")}</th>
                </tr>
            </thead>
            <tbody>
                {users.map((item, index) => (<UserItem key={item.userId} item={item} index={index} deleteUser={deleteUser} />))}
            </tbody>
        </Table>
    );
};

export default UserList;