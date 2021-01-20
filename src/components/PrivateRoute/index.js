import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import { Route } from 'react-router-dom'
import LoadingMask from '../LoadingMask'

const PrivateRoute = ({ component, ...args }) => (
    <Route
        component={withAuthenticationRequired(component, {
            onRedirecting: () => <LoadingMask />,
        })}
        {...args}
    ></Route>
)

export default PrivateRoute
