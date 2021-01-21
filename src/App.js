import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import {
    BudgetsProvider,
    ExpensesProvider,
    LocaleProvider,
    MonthSwitcherProvider,
} from 'context'
import PrivateRoute from './components/PrivateRoute'
import Landing from './pages/Landing'
import Dashboard from 'pages/Dashboard'
import Expenses from 'pages/Expenses'
import Budgets from './pages/Budgets'
import Profile from 'pages/Profile'
import i18n from 'i18n'
import './assets/scss/theme.scss'

const App = () => {
    const { isAuthenticated } = useAuth0()

    return (
        <Switch>
            <Route path="/" exact>
                {isAuthenticated ? (
                    <Redirect to="/dashboard" />
                ) : (
                    <LocaleProvider>
                        <Landing />
                    </LocaleProvider>
                )}
            </Route>
            <LocaleProvider>
                <MonthSwitcherProvider>
                    <BudgetsProvider>
                        <PrivateRoute
                            path="/profile"
                            component={Profile}
                            exact
                        />
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
            </LocaleProvider>
        </Switch>
    )
}

export default App
