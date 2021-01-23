import { useAuth0 } from '@auth0/auth0-react'
import { config } from 'config'
import PropTypes from 'prop-types'
import React, { createContext, useEffect, useState } from 'react'
import { getLastDayOfCurrentMonth, getPreviousYearFirstDayOfMonth } from 'utils'
import { showToast } from 'utils'

const getSumQuery = (startDate, endDate) => {
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

const getPlacesQuery = () => {
    return {
        query: `
            query {
                aggregatePlaces {
                    place
                    count
                }
            }
        `,
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
    const [aggregateSum, setAggregateSum] = useState([])
    const [aggregatePlaces, setAggregatePlaces] = useState([])
    const [refetchAggregateData, setRefetchAggregateData] = useState(0)

    useEffect(async () => {
        const fetchAggregateSum = async (startDate, endDate) => {
            const token = await getAccessTokenSilently()
            const query = getSumQuery(startDate, endDate)
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
    }, [aggregateStartDate, refetchAggregateData])

    useEffect(async () => {
        const fetchAggregatePlaces = async () => {
            const token = await getAccessTokenSilently()
            const query = getPlacesQuery()
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
            const { aggregatePlaces } = result.data
            return aggregatePlaces
        }

        const data = await fetchAggregatePlaces(
            aggregateStartDate,
            aggregateEndDate,
        )
        setAggregatePlaces(data)
    }, [aggregateStartDate, refetchAggregateData])

    const context = {
        aggregateSum,
        setAggregateSum,
        aggregatePlaces,
        setAggregatePlaces,
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
