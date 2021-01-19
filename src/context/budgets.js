import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { gql, useQuery } from '@apollo/client'
import { useMonthSwitcher } from 'hooks'
import useLocalStorageState from 'use-local-storage-state'

const BUDGETS_QUERY = gql`
    query($startDate: DateTime!, $endDate: DateTime!) {
        budgets {
            _id
            name
            amount
            showInMenu
            sum(startDate: $startDate, endDate: $endDate) {
                total
            }
        }
    }
`

const BudgetsContext = createContext()

const BudgetsProvider = ({ children }) => {
    const { startDate, endDate } = useMonthSwitcher()
    const [budgets, setBudgets] = useLocalStorageState('budgets', [])

    const { loading, error, data, refetch } = useQuery(BUDGETS_QUERY, {
        variables: { startDate, endDate },
    })

    if (loading) console.log('Loading budgets...')
    if (error) console.log(error)

    useEffect(() => {
        if (data) {
            setBudgets(data.budgets)
        }
    }, [data])

    useEffect(() => {
        refetch()
    }, [startDate])

    const context = {
        budgets,
        setBudgets,
    }

    return (
        <BudgetsContext.Provider value={context}>
            {children}
        </BudgetsContext.Provider>
    )
}

BudgetsProvider.propTypes = {
    children: PropTypes.node,
}

export { BudgetsContext, BudgetsProvider }
