import React from 'react'
import { useTranslation } from 'react-i18next';
import { Table, Container, Row, Col } from "reactstrap";
import OfficeObjectItem from '../OfficeObjectItem/OfficeObjectItem';

const OfficeObjectList = ({ officeObjects, deleteOfficeObject, editOfficeObject }) => {

    const { t } = useTranslation();

    if (officeObjects.length === 0) {
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
                    <th>{t("OfficeObjectName")}</th>
                    <th>{t("description")}</th>
                    <th>{t("Max_users")}</th>
                    <th>{t("Actions")}</th>
                </tr>
            </thead>
            <tbody>
                {officeObjects.map((item, index) => (<OfficeObjectItem key={item.officeObjectId} item={item} index={index} deleteOfficeObject={deleteOfficeObject} editOfficeObject={editOfficeObject} />))}
            </tbody>
        </Table>
    );
};

export default OfficeObjectList;