import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from "../helpers/Utils";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            getCurrentUser() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;