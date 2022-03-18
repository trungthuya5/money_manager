import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';
import {render} from "react-dom";

// handle the private routes

interface PrivateProp{
    component: Component,

}

function PrivateRoute({ component: any, ...rest }) {
    return (
        <Route
            {...rest}
    render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
)
}

    export default PrivateRoute;