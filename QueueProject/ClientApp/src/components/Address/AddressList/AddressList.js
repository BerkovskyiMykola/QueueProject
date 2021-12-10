import React from 'react'
import { useTranslation } from 'react-i18next';
import { Table, Container, Row, Col } from "reactstrap";
import AddressItem from '../AddressItem/AddressItem';

const AddressList = ({ addresses, deleteAddress, editAddress }) => {

    const { t } = useTranslation();

    if (addresses.length === 0) {
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
                    <th>{t("country")}</th>
                    <th>{t("city")}</th>
                    <th>{t("street")}</th>
                    <th>{t("postalCode")}</th>
                    <th>{t("Actions")}</th>
                </tr>
            </thead>
            <tbody>
                {addresses.map((item, index) => (<AddressItem key={item.addressId} item={item} index={index} deleteAddress={deleteAddress} editAddress={editAddress} />))}
            </tbody>
        </Table>
    );
};

export default AddressList;