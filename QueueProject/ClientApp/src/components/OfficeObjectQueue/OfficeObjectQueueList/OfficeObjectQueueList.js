import React from 'react'
import {  useTranslation } from 'react-i18next';
import { Table, Container, Row, Col } from "reactstrap";
import OfficeObjectQueueItem from "../OfficeObjectQueueItem/OfficeObjectQueueItem"

const OfficeObjectQueueList = ({ queues }) => {

    const { t } = useTranslation();

    if (queues.length === 0) {
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
                    <th>{t("User")}</th>
                    <th>{t("Status")}</th>
                    <th>{t("DateTimeCreate")}</th>
                    <th>{t("DateTimeUsing")}</th>
                    <th>{t("DateTimeFinish")}</th>
                </tr>
            </thead>
            <tbody>
                {queues.map((item, index) => (<OfficeObjectQueueItem key={item.officeId} item={item} index={index} />))}
            </tbody>
        </Table>
    );
};

export default OfficeObjectQueueList;