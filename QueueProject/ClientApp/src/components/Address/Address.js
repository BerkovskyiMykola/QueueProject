import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col } from "reactstrap";
import { validateLength40Between3, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import { Redirect } from 'react-router-dom';
import { createAddress, deleteAddress, editAddress, getAddresses } from '../../actions/address';
import AddressList from './AddressList/AddressList';
import { clearMessage } from '../../actions/message';
import datebaseService from '../../services/datebase.service';
import {  useTranslation } from 'react-i18next';

const Address = () => {
    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [addressId, setAddressId] = useState(0);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);

    const dispatch = useDispatch();

    const { user, message, addresses } = useSelector(state => ({
        user: state.auth.user,
        message: state.message.message,
        addresses: state.address.addresses
    }), shallowEqual)

    useEffect(() => {
        dispatch(getAddresses());
    }, [dispatch])

    const createRecord = () => {
        dispatch(createAddress(country, city, street, postalCode))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setCountry("");
        setCity("");
        setStreet("");
        setPostalCode("");
        setAddressId(0);
    }

    const editRecord = () => {
        dispatch(editAddress(addressId, country, city, street, postalCode))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const deleteRecord = (id) => {
        dispatch(deleteAddress(id))
            .then(() => { })
            .catch(() => { })
    }

    const getAddressValues = (addressId, country, city, street, postalCode) => {
        setCountry(country);
        setCity(city);
        setStreet(street);
        setPostalCode(postalCode);
        setAddressId(addressId);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    const createBackup = () => {
        datebaseService.backup().then(() => { alert("Success") }).catch(() => { alert("Error") });
    }

    const restoreDatabase = () => {
        datebaseService.restore().then(() => { alert("Success") }).catch(() => { alert("Error") });
    }

    if (!user) {
        return <Redirect to="/login" />;
    }
    if (user.role === "Admin") {
        return <Redirect to="/profile" />;
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("Addresses")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={createBackup} color="info">{t("CreateBackup")}</Button>
                        <Button onClick={restoreDatabase} color="warning">{t("RestoreDatabase")}</Button>
                        <Button onClick={() => { clearFields(); setModalAdd(true); }} color="success">{t("Create")}</Button>
                        <Button onClick={() => { dispatch(getAddresses()); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>
            <AddressList addresses={addresses} deleteAddress={deleteRecord} editAddress={getAddressValues}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton={t("Create")} method={createRecord} form={form} message={message}
            >
                <Field title={t("country")} name="country" value={country}
                    setValue={(e) => { setCountry(e.target.value) }} validations={[validateRequired(t), validateLength40Between3(t)]} />
                <Field title={t("city")} name="city" value={city}
                    setValue={(e) => { setCity(e.target.value) }} validations={[validateRequired(t), validateLength40Between3(t)]} />
                <Field title={t("street")} name="street" value={street}
                    setValue={(e) => { setStreet(e.target.value) }} validations={[validateRequired(t), validateLength40Between3(t)]} />
                <Field title={t("postalCode")} name="postalCode" value={postalCode}
                    setValue={(e) => { setPostalCode(e.target.value) }} type="number" min={0} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                method={editRecord} message={message} form={form} textButton={t("Edit")}
            >
                <Field title={t("country")} name="country" value={country}
                    setValue={(e) => { setCountry(e.target.value) }} validations={[validateRequired(t), validateLength40Between3(t)]} />
                <Field title={t("city")} name="city" value={city}
                    setValue={(e) => { setCity(e.target.value) }} validations={[validateRequired(t), validateLength40Between3(t)]} />
                <Field title={t("street")} name="street" value={street}
                    setValue={(e) => { setStreet(e.target.value) }} validations={[validateRequired(t), validateLength40Between3(t)]} />
                <Field title={t("postalCode")} name="postalCode" value={postalCode}
                    setValue={(e) => { setPostalCode(e.target.value) }} type="number" min={0} />
            </ModalWindow>
        </Container>
    );
};

export default Address;