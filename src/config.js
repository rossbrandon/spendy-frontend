export const config = {
    auth0: {
        domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
        clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: process.env.REACT_APP_AUTH0_SCOPE,
    },
    backend: {
        url: process.env.REACT_APP_BACKEND_URL || '',
    },
}
