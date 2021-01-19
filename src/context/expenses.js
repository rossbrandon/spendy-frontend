import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { gql, useQuery } from '@apollo/client'
import { useMonthSwitcher } from 'hooks'

const EXPENSES_QUERY = gql`
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
`

const ExpensesContext = createContext()

const ExpensesProvider = ({ children }) => {
    const { startDate, endDate } = useMonthSwitcher()
    const [budgetId, setBudgetId] = useState('')
    const [expenses, setExpenses] = useState([])

    const { loading, error, data, refetch } = useQuery(EXPENSES_QUERY, {
        variables: { id: budgetId, startDate, endDate },
    })

    if (loading) console.log('Loading expenses...')
    if (error) console.log(error)

    useEffect(() => {
        if (data) {
            setExpenses(data.budget.expenses)
        }
    }, [data])

    useEffect(() => {
        refetch()
    }, [startDate])

    const context = {
        expenses,
        setExpenses,
        budgetId,
        setBudgetId,
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
