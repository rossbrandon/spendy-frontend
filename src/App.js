import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { BudgetsProvider, ExpensesProvider } from 'context'
import { MonthSwitcherProvider } from 'context/monthSwitcher'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import LoadingMask from './components/LoadingMask/LoadingMask'
import Landing from './pages/Landing'
import Dashboard from 'pages/Dashboard'
import Expenses from 'pages/Expenses'
import Budgets from './pages/Budgets'
import { config } from './config'
import './assets/scss/theme.scss'

const httpLink = createHttpLink({
    uri: config.backend.url,
})

const App = () => {
    const [accessToken, setAccessToken] = useState('')
    const [client, setClient] = useState()
    const { getAccessTokenSilently, isAuthenticated } = useAuth0()
    const options = {
        audience: config.auth0.audience,
        scope: config.auth0.scope,
    }
    const { audience, scope } = options

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
        return <LoadingMask />
    }

    return (
        <Switch>
            <Route path="/" exact>
                {isAuthenticated ? <Redirect to="/dashboard" /> : <Landing />}
            </Route>
            <ApolloProvider client={client}>
                <MonthSwitcherProvider>
                    <BudgetsProvider>
                        <PrivateRoute
                            path="/dashboard"
                            component={Dashboard}
                            exact
                        />
                        <PrivateRoute
                            path="/budgets"
                            component={Budgets}
                            exact
                        />
                        <ExpensesProvider>
                            <PrivateRoute
                                path="/expenses/:budgetId"
                                component={Expenses}
                                exact
                            />
                        </ExpensesProvider>
                    </BudgetsProvider>
                </MonthSwitcherProvider>
            </ApolloProvider>
        </Switch>
    )
}

export default App
