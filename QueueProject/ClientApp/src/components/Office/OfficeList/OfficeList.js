import React from 'react'
import {  useTranslation } from 'react-i18next';
import { Table, Container, Row, Col } from "reactstrap";
import OfficeItem from "../OfficeItem/OfficeItem"

const OfficeList = ({ offices, deleteOffice, getFields }) => {

    const { t } = useTranslation();

    if (offices.length === 0) {
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
                    <th>{t("OfficeName")}</th>
                    <th>{t("Actions")}</th>
                </tr>
            </thead>
            <tbody>
                {offices.map((item, index) => (<OfficeItem key={item.officeId} item={item} index={index} deleteOffice={deleteOffice} getFields={getFields} />))}
            </tbody>
        </Table>
    );
};

export default OfficeList;