import { useAuth0 } from '@auth0/auth0-react'
import { config } from 'config'
import PropTypes from 'prop-types'
import React, { createContext, useEffect, useState } from 'react'
import { getLastDayOfCurrentMonth, getPreviousYearFirstDayOfMonth } from 'utils'
import { showToast } from 'utils'

const getQuery = (startDate, endDate) => {
    return {
        query: `
            query($startDate: DateTime!, $endDate: DateTime!) {
                aggregateSum(startDate: $startDate, endDate: $endDate) {
                    budget
                    month
                    total
                }
            }
        `,
        variables: { startDate, endDate },
    }
}

const AggregateSumContext = createContext()

const AggregateSumProvider = ({ children }) => {
    const { getAccessTokenSilently } = useAuth0()
    const [aggregateStartDate, setAggregateStartDate] = useState(
        getPreviousYearFirstDayOfMonth(new Date()),
    )
    const [aggregateEndDate, setAggregateEndDate] = useState(
        getLastDayOfCurrentMonth(),
    )
    const [aggregateSum, setAggregateSum] = useState([])

    useEffect(async () => {
        const fetchAggregateSum = async (startDate, endDate) => {
            const token = await getAccessTokenSilently()
            const query = getQuery(startDate, endDate)
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
            const { aggregateSum } = result.data
            return aggregateSum
        }

        const data = await fetchAggregateSum(
            aggregateStartDate,
            aggregateEndDate,
        )
        setAggregateSum(data)
    }, [aggregateStartDate])

    const context = {
        aggregateSum,
        setAggregateSum,
        aggregateStartDate,
        setAggregateStartDate,
        aggregateEndDate,
        setAggregateEndDate,
    }

    return (
        <AggregateSumContext.Provider value={context}>
            {children}
        </AggregateSumContext.Provider>
    )
}

AggregateSumProvider.propTypes = {
    children: PropTypes.node,
}

export { AggregateSumContext, AggregateSumProvider }
