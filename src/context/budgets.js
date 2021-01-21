import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useMonthSwitcher } from 'hooks'
import useLocalStorageState from 'use-local-storage-state'
import { useAuth0 } from '@auth0/auth0-react'
import { config } from '../config'
import { showToast } from '../utils'

const getQuery = (startDate, endDate) => {
    return {
        query: `
            query($startDate: DateTime!, $endDate: DateTime!) {
                budgets {
                    _id
                    name
                    amount
                    showInMenu
                    startDate
                    endDate
                    sum(startDate: $startDate, endDate: $endDate) {
                        total
                    }
                }
            }
        `,
        variables: { startDate, endDate },
    }
}

const BudgetsContext = createContext()

const BudgetsProvider = ({ children }) => {
    const { getAccessTokenSilently } = useAuth0()
    const { startDate, endDate } = useMonthSwitcher()
    const [budgets, setBudgets] = useLocalStorageState('budgets', [])
    const [refetchBudgetData, setRefetchBudgetData] = useState(0)

    useEffect(async () => {
        const fetchBudgets = async (startDate, endDate) => {
            const token = await getAccessTokenSilently()
            const query = getQuery(startDate, endDate)
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
            const { budgets } = result.data
            return budgets
        }

        const data = await fetchBudgets(startDate, endDate)
        setBudgets(data)
    }, [startDate, refetchBudgetData])

    const context = {
        budgets,
        setBudgets,
        refetchBudgetData,
        setRefetchBudgetData,
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
