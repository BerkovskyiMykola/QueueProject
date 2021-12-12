import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col } from "reactstrap";
import { validateDescription, validateLength40Between3, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import { Redirect } from 'react-router-dom';
import { getOfficeObjects, createOfficeObject, deleteOfficeObject, editOfficeObject } from '../../actions/officeObject';
import OfficeObjectList from './OfficeObjectList/OfficeObjectList';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';

const OfficeObject = () => {
    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [officeObjectId, setOfficeObjectId] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [max_users, setMax_users] = useState(1);
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);

    const dispatch = useDispatch();

    const { user, message, officeObjects } = useSelector(state => ({
        user: state.auth.user,
        message: state.message.message,
        officeObjects: state.officeObject.officeObjects
    }), shallowEqual)

    useEffect(() => {
        dispatch(getOfficeObjects());
    }, [dispatch])

    const createRecord = () => {
        dispatch(createOfficeObject(name, description, max_users))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setName("");
        setDescription("");
        setMax_users(1);
        setOfficeObjectId(0);
    }

    const editRecord = () => {
        dispatch(editOfficeObject(officeObjectId, name, description, max_users))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const deleteRecord = (id) => {
        dispatch(deleteOfficeObject(id))
            .then(() => { })
            .catch(() => { })
    }

    const getAddressValues = (officeObjectId, name, description, max_users) => {
        setOfficeObjectId(officeObjectId);
        setName(name);
        setDescription(description);
        setMax_users(max_users);
        dispatch(clearMessage());
        setModalEdit(true);
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
                    <Col className="text-left"><h3>{t("OfficeObjects")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => { clearFields(); setModalAdd(true); }} color="success">{t("Create")}</Button>
                        <Button onClick={() => { dispatch(getOfficeObjects()); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>
            <OfficeObjectList officeObjects={officeObjects} deleteOfficeObject={deleteRecord} editOfficeObject={getAddressValues}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton={t("Create")} method={createRecord} form={form} message={message}
            >
                <Field title={t("OfficeObjectName")} name="OfficeObjectName" value={name}
                    setValue={(e) => { setName(e.target.value) }} validations={[validateRequired(t), validateLength40Between3(t)]} />
                <Field title={t("OfficeObjectDescription")} name="OfficeObjectDescription" value={description}
                    setValue={(e) => { setDescription(e.target.value) }} validations={[validateDescription(t)]} />
                <Field title={t("Max_users")} name="Max_users" value={max_users}
                    setValue={(e) => { setMax_users(e.target.value) }} type="number" min={1} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                method={editRecord} message={message} form={form} textButton={t("Edit")}
            >
                <Field title={t("OfficeObjectName")} name="OfficeObjectName" value={name}
                    setValue={(e) => { setName(e.target.value) }} validations={[validateRequired(t), validateLength40Between3(t)]} />
                <Field title={t("OfficeObjectDescription")} name="OfficeObjectDescription" value={description}
                    setValue={(e) => { setDescription(e.target.value) }} validations={[validateDescription(t)]} />
                <Field title={t("Max_users")} name="Max_users" value={max_users}
                    setValue={(e) => { setMax_users(e.target.value) }} type="number" min={1} />
            </ModalWindow>
        </Container>
    );
};

export default OfficeObject;