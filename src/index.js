import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom'

import './i18n'

import App from './App'
import { config } from './config'
import * as serviceWorker from './serviceWorker'

const app = (
    <Auth0Provider
        domain={config.auth0.domain}
        clientId={config.auth0.clientId}
        redirectUri={window.location.origin}
        audience={config.auth0.audience}
        scope={config.auth0.scope}
        useRefreshTokens={true}
    >
        <App />
    </Auth0Provider>
)

ReactDOM.render(app, document.getElementById('root'))
serviceWorker.unregister()
