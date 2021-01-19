import React, { useEffect, useState } from 'react'
import { Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
} from '@apollo/client'
import Dashboard from 'pages/Dashboard'
import Expenses from 'pages/Expenses'
import { BudgetsProvider, ExpensesProvider } from 'context'
import { MonthSwitcherProvider } from 'context/monthSwitcher'
import PrivateRoute from 'components/PrivateRoute'
import { setContext } from '@apollo/client/link/context'
import { config } from './config'
import './assets/scss/theme.scss'
import Budgets from './pages/Budgets'

const httpLink = createHttpLink({
    uri: config.backend.url,
})

const App = () => {
    const [accessToken, setAccessToken] = useState('')
    const [client, setClient] = useState()
    const { getAccessTokenSilently, isLoading } = useAuth0()
    const options = {
        audience: config.auth0.audience,
        scope: config.auth0.scope,
    }
    const { audience, scope, ...fetchOptions } = options

    useEffect(() => {
        const getAccessToken = async () => {
            try {
                const token = await getAccessTokenSilently({ audience })
                setAccessToken(token)
            } catch (e) {
                console.log(e)
            }
        }
        getAccessToken()
    }, [])

    useEffect(() => {
        const authLink = setContext((_, { headers }) => {
            const token = accessToken
            if (token) {
                return {
                    headers: {
                        ...headers,
                        authorization: `Bearer ${token}`,
                    },
                }
            } else {
                return {
                    headers: {
                        ...headers,
                    },
                }
            }
        })

        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        })

        setClient(client)
    }, [accessToken])

    if (!client) {
        return (
            <div id="preloader">
                <div id="status">
                    <div className="spinner-chase">
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Router>
            <Switch>
                <ApolloProvider client={client}>
                    <MonthSwitcherProvider>
                        <BudgetsProvider>
                            <PrivateRoute path="/dashboard">
                                <Dashboard />
                            </PrivateRoute>
                            <PrivateRoute path="/budgets">
                                <Budgets />
                            </PrivateRoute>
                            <PrivateRoute path="/expenses/:budgetId">
                                <ExpensesProvider>
                                    <Expenses />
                                </ExpensesProvider>
                            </PrivateRoute>
                            <PrivateRoute path="/" exact={true}>
                                <Redirect to="/dashboard" />
                            </PrivateRoute>
                        </BudgetsProvider>
                    </MonthSwitcherProvider>
                </ApolloProvider>
            </Switch>
        </Router>
    )
}

export default App
