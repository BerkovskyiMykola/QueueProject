import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col } from "reactstrap";
import { Redirect } from 'react-router-dom';
import { getUserQueues } from "../../actions/user"
import UserQueueList from "./UserQueueList/UserQueueList"

const UserQueue = (props) => {
    const userId = props.match.params.userId;

    const dispatch = useDispatch();

    const { queues, lastname, firstname, user } = useSelector(state => ({
        lastname: state.user.userQueues.lastname,
        firstname: state.user.userQueues.firstname,
        queues: state.user.userQueues.queues,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getUserQueues(userId))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [dispatch, userId, props.history])

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
                            <strong>{lastname} {firstname}</strong>
                        </h3>
                    </Col>
                    <Col className="text-right">
                        <Button onClick={() => { dispatch(getUserQueues(userId)); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </header>

            <UserQueueList queues={queues}/>
        </Container>
    );
};

export default UserQueue;