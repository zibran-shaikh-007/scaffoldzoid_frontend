
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from "../helpers/Utils";


const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route

        <Route {...rest} render={props => (

            (getCurrentUser() && restricted ?
                getCurrentUser().role==="buyer" ? <Redirect to="/buyer" />:<Redirect to="/seller" />
                : <Component {...props} />)
           



        )} />
    );
};

export default PublicRoute;