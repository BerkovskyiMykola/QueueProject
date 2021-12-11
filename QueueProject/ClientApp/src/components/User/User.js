import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col } from "reactstrap";
import { validateEmail, validateField, validatePassword, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import { Redirect } from 'react-router-dom';
import { createUser, deleteUser, getUsers } from '../../actions/user';
import UserList from './UserList/UserList';
import { clearMessage } from '../../actions/message';
import {  useTranslation } from 'react-i18next';

const User = (props) => {
    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);

    const dispatch = useDispatch();

    const { users, message, user } = useSelector(state => ({
        users: state.user.users,
        message: state.message.message,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    const createRecord = () => {
        dispatch(createUser(lastName, firstName, email, password))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    }

    const deleteRecord = (id) => {
        dispatch(deleteUser(id))
            .then(() => { })
            .catch(() => { })
    }

    if (!user) {
        return <Redirect to="/login" />;
    }
    if (user.role === "SuperAdmin") {
        return <Redirect to="/address" />;
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("Users")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => setModalAdd(true)} color="success">{t("Create")}</Button>
                        <Button onClick={() => {
                            dispatch(getUsers());
                        }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>
            <UserList users={users} deleteUser={deleteRecord}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton={t("Create")} method={createRecord} form={form} message={message}
            >
                <Field title={t("Email")} name="email" value={email}
                    setValue={(e) => { setEmail(e.target.value) }} validations={[validateRequired(t), validateEmail(t)]} />
                <Field title={t("Firsname")} name="firstname" value={firstName}
                    setValue={(e) => { setFirstName(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                <Field title={t("Lastname")} name="lastname" value={lastName}
                    setValue={(e) => { setLastName(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                <Field title={t("Password")} name="password" value={password}
                    setValue={(e) => { setPassword(e.target.value) }} validations={[validateRequired(t), validatePassword(t)]} />
            </ModalWindow>
        </Container>
    );
};

export default User;