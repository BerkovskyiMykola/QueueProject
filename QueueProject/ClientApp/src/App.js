import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

import Login from "./components/Login";
import Profile from "./components/Profile";
import { Home } from "./components/Home";
import NotFound from "./components/NotFound";
import Address from "./components/Address/Address"
import Office from "./components/Office/Office"
import User from "./components/User/User"
import OfficeObject from "./components/OfficeObject/OfficeObject"
import UserQueue from "./components/UserQueue/UserQueue"

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './utils/history';
import EventBus from "./common/EventBus";
import { useTranslation } from "react-i18next";

export default function App() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const { user } = useSelector(state => ({
        user: state.auth.user,
    }), shallowEqual)

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage());
        });

        EventBus.on("logout", () => {
            dispatch(logout());
        });

        return () => { EventBus.remove("logout"); }
    }, [dispatch])

    const logOut = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    return (
        <Router history={history}>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        QueueProject
                    </Link>

                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a href="/" className="nav-link" onClick={(e) => { e.preventDefault(); i18n.changeLanguage("en"); }}>
                                EN
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="nav-link" onClick={(e) => { e.preventDefault(); i18n.changeLanguage("ua"); }}>
                                UA
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                {t("Home")}
                            </Link>
                        </li>
                    </div>

                    <div className="navbar-nav ml-auto">
                        {user ? (
                            <>
                                {user.role === "SuperAdmin" ? (
                                    <>
                                        <li className="nav-item">
                                            <Link to={"/address"} className="nav-link">
                                                {t("Addresses")}
                                            </Link>
                                        </li>
                                    </>
                                ) : (<>
                                        <li className="nav-item">
                                            <Link to={"/user"} className="nav-link">
                                                {t("Users")}
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/officeObject"} className="nav-link">
                                                {t("OfficeObjects")}
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/profile"} className="nav-link">
                                                {t("Profile")}
                                            </Link>
                                        </li>
                                    </>)
                                }
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={logOut}>
                                        {t("LogOut")}
                                    </a>
                                </li></>
                        ) : (
                            <><li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    {t("Login")}
                                </Link>
                            </li></>
                        )}
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/address" component={Address} />
                        <Route exact path="/officeObject" component={OfficeObject} />
                        <Route exact path="/user" component={User} />
                        <Route exact path="/offices/:addressId" component={Office} />
                        <Route exact path="/userQueue/:userId" component={UserQueue} />
                        <Route exact path="/404" component={NotFound} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}
