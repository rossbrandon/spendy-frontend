import { withAuthenticationRequired } from '@auth0/auth0-react'
import { PropTypes } from 'prop-types'
import React from 'react'
import { Route } from 'react-router-dom'

import LoadingMask from '../LoadingMask'

const loadingMask = () => {
    return <LoadingMask />
}

const PrivateRoute = ({ component, ...args }) => (
    <Route
        component={withAuthenticationRequired(component, {
            onRedirecting: loadingMask,
        })}
        {...args}
    ></Route>
)

PrivateRoute.propTypes = {
    component: PropTypes.object,
}

export default PrivateRoute
