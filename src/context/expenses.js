import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useMonthSwitcher } from 'hooks'
import { useAuth0 } from '@auth0/auth0-react'
import { config } from '../config'
import { showToast } from '../utils'

const getQuery = (id, startDate, endDate) => {
    return {
        query: `
            query($id: String!, $startDate: DateTime!, $endDate: DateTime!) {
                budget(id: $id) {
                    _id
                    name
                    amount
                    sum(startDate: $startDate, endDate: $endDate) {
                        total
                    }
                    expenses(startDate: $startDate, endDate: $endDate) {
                        _id
                        date
                        place
                        reason
                        userEmail
                        price
                    }
                }
            }
        `,
        variables: { id, startDate, endDate },
    }
}

const ExpensesContext = createContext()

const ExpensesProvider = ({ children }) => {
    const { getAccessTokenSilently } = useAuth0()
    const { startDate, endDate } = useMonthSwitcher()
    const [budgetId, setBudgetId] = useState('')
    const [expenses, setExpenses] = useState([])
    const [refetchExpenseData, setRefetchExpenseData] = useState(0)

    useEffect(async () => {
        const fetchExpenses = async (id, startDate, endDate) => {
            const token = await getAccessTokenSilently()
            const query = getQuery(id, startDate, endDate)
            const response = await fetch(config.backend.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(query),
            })
            const result = await response.json()
            if (result.errors) {
                showToast('error', result.errors[0].message)
                return []
            }
            const { expenses } = result.data.budget
            return expenses
        }

        if (budgetId) {
            const data = await fetchExpenses(budgetId, startDate, endDate)
            setExpenses(data)
        }
    }, [budgetId, startDate, refetchExpenseData])

    const context = {
        expenses,
        setExpenses,
        budgetId,
        setBudgetId,
        refetchExpenseData,
        setRefetchExpenseData,
    }

    return (
        <ExpensesContext.Provider value={context}>
            {children}
        </ExpensesContext.Provider>
    )
}

ExpensesProvider.propTypes = {
    children: PropTypes.node,
}

export { ExpensesContext, ExpensesProvider }
