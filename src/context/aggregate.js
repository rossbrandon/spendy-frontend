import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import { config } from '../config'
import { showToast } from '../utils'
import { getPreviousYearFirstDayOfMonth, getLastDayOfCurrentMonth } from 'utils'

const getQuery = (startDate, endDate) => {
    return {
        query: `
            query($startDate: DateTime!, $endDate: DateTime!) {
                aggregate(startDate: $startDate, endDate: $endDate) {
                    budget
                    month
                    total
                }
            }
        `,
        variables: { startDate, endDate },
    }
}

const AggregateContext = createContext()

const AggregateProvider = ({ children }) => {
    const { getAccessTokenSilently } = useAuth0()
    const [aggregateStartDate, setAggregateStartDate] = useState(
        getPreviousYearFirstDayOfMonth(new Date()),
    )
    const [aggregateEndDate, setAggregateEndDate] = useState(
        getLastDayOfCurrentMonth(),
    )
    const [aggregate, setAggregate] = useState([])
    const [refetchAggregateData, setRefetchAggregateData] = useState(0)

    useEffect(async () => {
        const fetchExpenses = async (startDate, endDate) => {
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
            const { aggregate } = result.data
            return aggregate
        }

        const data = await fetchExpenses(aggregateStartDate, aggregateEndDate)
        setAggregate(data)
    }, [aggregateStartDate, refetchAggregateData])

    const context = {
        aggregate,
        setAggregate,
        aggregateStartDate,
        setAggregateStartDate,
        aggregateEndDate,
        setAggregateEndDate,
        refetchAggregateData,
        setRefetchAggregateData,
    }

    return (
        <AggregateContext.Provider value={context}>
            {children}
        </AggregateContext.Provider>
    )
}

AggregateProvider.propTypes = {
    children: PropTypes.node,
}

export { AggregateContext, AggregateProvider }
