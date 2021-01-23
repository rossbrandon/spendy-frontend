import { useAuth0 } from '@auth0/auth0-react'
import { config } from 'config'
import PropTypes from 'prop-types'
import React, { createContext, useEffect, useState } from 'react'
import { showToast } from 'utils'

const getQuery = () => {
    return {
        query: `
            query {
                budgets {
                    _id
                    name
                    amount
                    startDate
                    endDate
                    showInMenu
                    sortOrder
                }
            }
        `,
    }
}

const AllBudgetsContext = createContext()

const AllBudgetsProvider = ({ children }) => {
    const { getAccessTokenSilently } = useAuth0()
    const [allBudgets, setAllBudgets] = useState([])
    const [refetchAllBudgetData, setRefetchAllBudgetData] = useState(0)

    useEffect(async () => {
        const fetchAllBudgets = async () => {
            const token = await getAccessTokenSilently()
            const query = getQuery()
            const response = await fetch(config.backend.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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

        const data = await fetchAllBudgets()
        setAllBudgets(data)
    }, [refetchAllBudgetData])

    const context = {
        allBudgets,
        setAllBudgets,
        refetchAllBudgetData,
        setRefetchAllBudgetData,
    }

    return (
        <AllBudgetsContext.Provider value={context}>
            {children}
        </AllBudgetsContext.Provider>
    )
}

AllBudgetsProvider.propTypes = {
    children: PropTypes.node,
}

export { AllBudgetsContext, AllBudgetsProvider }
