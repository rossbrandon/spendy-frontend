import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import {
    BudgetsProvider,
    ExpensesProvider,
    LocaleProvider,
    MonthSwitcherProvider,
    LoadingProvider,
    AggregateProvider,
} from 'context'
import PrivateRoute from './components/PrivateRoute'
import Landing from './pages/Landing'
import Dashboard from 'pages/Dashboard'
import Expenses from 'pages/Expenses'
import Budgets from './pages/Budgets'
import Profile from 'pages/Profile'
import i18n from 'i18n'
import './assets/scss/theme.scss'
import ExpenseSearch from 'pages/ExpenseSearch'
import Trends from 'pages/Trends'

const App = () => {
    const { isAuthenticated } = useAuth0()

    return (
        <Switch>
            <Route path="/" exact>
                {isAuthenticated ? <Redirect to="/dashboard" /> : <Landing />}
            </Route>
            <LoadingProvider>
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
                            <PrivateRoute
                                path="/search"
                                component={ExpenseSearch}
                                exact
                            />
                            <AggregateProvider>
                                <PrivateRoute
                                    path="/trends"
                                    component={Trends}
                                    exact
                                />
                            </AggregateProvider>
                            <ExpensesProvider>
                                <PrivateRoute
                                    path="/expenses/:budgetId/:startDateOverride?/:endDateOverride?"
                                    component={Expenses}
                                    exact
                                />
                            </ExpensesProvider>
                        </BudgetsProvider>
                    </MonthSwitcherProvider>
                </LocaleProvider>
            </LoadingProvider>
        </Switch>
    )
}

export default App
