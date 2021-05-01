import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userData } from '../../App';

const AdminPrivateRoute = ({ children, ...rest }) => {

    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                userData && userData.token !== null ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        </div>
    );
};

export default AdminPrivateRoute;