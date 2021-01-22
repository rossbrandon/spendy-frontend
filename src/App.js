import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import {
    BudgetsProvider,
    ExpensesProvider,
    LocaleProvider,
    MonthSwitcherProvider,
    LoadingProvider,
    AggregateProvider,
    AllExpensesProvider,
} from 'context'
import PrivateRoute from './components/PrivateRoute'
import Landing from './pages/Landing'
import Dashboard from 'pages/Dashboard'
import Expenses from 'pages/Expenses'
import Budgets from './pages/Budgets'
import Profile from 'pages/Profile'
import ExpenseSearch from 'pages/ExpenseSearch'
import Trends from 'pages/Trends'
import i18n from 'i18n'
import './assets/scss/theme.scss'

const App = () => {
    const { isAuthenticated } = useAuth0()

    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact>
                    {isAuthenticated ? (
                        <Redirect to="/dashboard" />
                    ) : (
                        <Landing />
                    )}
                </Route>
                <LoadingProvider>
                    <LocaleProvider>
                        <MonthSwitcherProvider>
                            <BudgetsProvider>
                                <Route
                                    path={[
                                        '/profile',
                                        '/dashboard',
                                        '/budgets',
                                    ]}
                                    exact
                                >
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
                                </Route>
                                <Route path={['/expenses']}>
                                    <ExpensesProvider>
                                        <PrivateRoute
                                            path="/expenses/:budgetId/:startDateOverride?/:endDateOverride?"
                                            component={Expenses}
                                            exact
                                        />
                                    </ExpensesProvider>
                                </Route>
                                <Route path={['/search']} exact>
                                    <AllExpensesProvider>
                                        <PrivateRoute
                                            path="/search"
                                            component={ExpenseSearch}
                                            exact
                                        />
                                    </AllExpensesProvider>
                                </Route>
                                <Route path={['/trends']} exact>
                                    <AggregateProvider>
                                        <PrivateRoute
                                            path="/trends"
                                            component={Trends}
                                            exact
                                        />
                                    </AggregateProvider>
                                </Route>
                            </BudgetsProvider>
                        </MonthSwitcherProvider>
                    </LocaleProvider>
                </LoadingProvider>
            </Switch>
        </HashRouter>
    )
}

export default App
