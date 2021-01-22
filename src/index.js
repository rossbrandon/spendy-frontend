import React from 'react'
import ReactDOM from 'react-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { config } from './config'
import './i18n'

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
