import React from "react";

import { shallowEqual, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function Profile(props) {

    const { user } = useSelector(state => ({
        user: state.auth.user,
    }), shallowEqual)


    if (!user) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="container">
            <p>Authorize</p>
        </div>
    );
}