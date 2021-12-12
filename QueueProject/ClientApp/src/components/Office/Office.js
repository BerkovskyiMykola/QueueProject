import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import { validateDescription, validateEmail, validateField, validateLength40Between3, validatePassword, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import { Redirect } from 'react-router-dom';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';
import { createOffice, deleteOffice, getOffices } from "../../actions/office"
import OfficeList from './OfficeList/OfficeList';

const Office = (props) => {
    const addressId = props.match.params.addressId;

    const { t } = useTranslation();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [modalAdd, setModalAdd] = useState(false);
    const [modalInfo, setModalInfo] = useState(false);
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);

    const dispatch = useDispatch();

    const { offices, addressName, message, user } = useSelector(state => ({
        offices: state.office.offices,
        addressName: state.office.addressName,
        message: state.message.message,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getOffices(addressId))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [dispatch, addressId, props.history])

    const createRecord = () => {
        dispatch(createOffice(name, description, addressId, lastname, firstname, email, password))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setName("");
        setLastname("");
        setFirstname("");
        setEmail("");
        setDescription("");
        setPassword("");
    }

    const getFields = (name, description, lastname, firstname, email) => {
        setName(name);
        setLastname(lastname);
        setFirstname(firstname);
        setEmail(email);
        setDescription(description);
        setModalInfo(true)
    }

    const deleteRecord = (id) => {
        dispatch(deleteOffice(id))
            .then(() => { })
            .catch(() => { })
    }

    if (!user) {
        return <Redirect to="/login" />;
    }
    if (user.role === "Admin") {
        return <Redirect to="/profile" />;
    }

    return (
        <Container>
            <header className="jumbotron">
                <Row>
                    <Col className="text-left">
                        <h3>
                            <strong>{addressName}</strong>
                        </h3>
                    </Col>
                    <Col className="text-right">
                        <Button onClick={() => { clearFields(); setModalAdd(true); } } color="success">{t("Create")}</Button>
                        <Button onClick={() => { dispatch(getOffices(addressId)); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </header>

            <OfficeList offices={offices} deleteOffice={deleteRecord} getFields={getFields}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton={t("Create")} method={createRecord} form={form} message={message}
            >
                <Field title={t("OfficeName")} name="name" value={name}
                    setValue={(e) => { setName(e.target.value) }} validations={[validateRequired(t), validateLength40Between3(t)]} />
                <Field title={t("description")} name="description" value={description}
                    setValue={(e) => { setDescription(e.target.value) }} validations={[validateDescription(t)]} />
                <Field title={t("Lastname")} name="lastname" value={lastname}
                    setValue={(e) => { setLastname(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                <Field title={t("Firstname")} name="firstname" value={firstname}
                    setValue={(e) => { setFirstname(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                <Field title={t("Email")} name="email" value={email}
                    setValue={(e) => { setEmail(e.target.value) }} validations={[validateRequired(t), validateEmail(t)]} />
                <Field title={t("Password")} name="password" value={password}
                    setValue={(e) => { setPassword(e.target.value) }} validations={[validateRequired(t), validatePassword(t)]} />
            </ModalWindow>

            <Modal isOpen={modalInfo} toggle={() => setModalInfo(false)}>
                <ModalHeader toggle={() => setModalInfo(false)} >{t("Info")}</ModalHeader>
                <ModalBody>
                    <p>{t("OfficeName")}: {name}</p>
                    <br />
                    <p>{t("description")}:</p>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={description}
                        disabled
                    />
                    <br />
                    <p>{t("Lastname")}: {lastname}</p>
                    <br />
                    <p>{t("Firstname")}: {firstname}</p>
                    <br />
                    <p>{t("Email")}: {email}</p>
                </ModalBody>
            </Modal>
        </Container>
    );
};

export default Office;