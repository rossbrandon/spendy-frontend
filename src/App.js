import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { BudgetsProvider, ExpensesProvider } from 'context'
import { MonthSwitcherProvider } from 'context/monthSwitcher'
import PrivateRoute from './components/PrivateRoute'
import Landing from './pages/Landing'
import Dashboard from 'pages/Dashboard'
import Expenses from 'pages/Expenses'
import Budgets from './pages/Budgets'
import './assets/scss/theme.scss'
import Profile from 'pages/Profile'

const App = () => {
    const { isAuthenticated } = useAuth0()
    return (
        <Switch>
            <Route path="/" exact>
                {isAuthenticated ? <Redirect to="/dashboard" /> : <Landing />}
            </Route>
            <MonthSwitcherProvider>
                <BudgetsProvider>
                    <PrivateRoute path="/profile" component={Profile} exact />
                    <PrivateRoute
                        path="/dashboard"
                        component={Dashboard}
                        exact
                    />
                    <PrivateRoute path="/budgets" component={Budgets} exact />
                    <ExpensesProvider>
                        <PrivateRoute
                            path="/expenses/:budgetId"
                            component={Expenses}
                            exact
                        />
                    </ExpensesProvider>
                </BudgetsProvider>
            </MonthSwitcherProvider>
        </Switch>
    )
}

export default App
