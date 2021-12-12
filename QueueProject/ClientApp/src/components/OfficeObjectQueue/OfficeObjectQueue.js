import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col } from "reactstrap";
import { Redirect } from 'react-router-dom';
import { getOfficeObjectQueues } from "../../actions/officeObject"
import OfficeObjectQueueList from "./OfficeObjectQueueList/OfficeObjectQueueList"

const OfficeObjectQueue = (props) => {
    const officeObjectId = props.match.params.officeObjectId;

    const dispatch = useDispatch();

    const { queues, name, description, user } = useSelector(state => ({
        name: state.officeObject.officeObjectQueues.name,
        description: state.officeObject.officeObjectQueues.description,
        queues: state.officeObject.officeObjectQueues.queues,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getOfficeObjectQueues(officeObjectId))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [dispatch, officeObjectId, props.history])

    if (!user) {
        return <Redirect to="/login" />;
    }
    if (user.role === "SuperAdmin") {
        return <Redirect to="/address" />;
    }

    return (
        <Container>
            <header className="jumbotron">
                <Row>
                    <Col className="text-left">
                        <h3>
                            <strong>{name}</strong>
                        </h3>
                        <h3>
                            <strong>{description}</strong>
                        </h3>
                    </Col>
                    <Col className="text-right">
                        <Button onClick={() => { dispatch(getOfficeObjectQueues(officeObjectId)); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </header>

            <OfficeObjectQueueList queues={queues}/>
        </Container>
    );
};

export default OfficeObjectQueue;