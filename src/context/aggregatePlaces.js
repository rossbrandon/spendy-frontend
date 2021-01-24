import { useAuth0 } from '@auth0/auth0-react'
import { config } from 'config'
import PropTypes from 'prop-types'
import React, { createContext, useEffect, useState } from 'react'
import { showToast } from 'utils'

const getQuery = () => {
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

const AggregatePlacesContext = createContext()

const AggregatePlacesProvider = ({ children }) => {
    const { getAccessTokenSilently } = useAuth0()
    const [aggregatePlaces, setAggregatePlaces] = useState([])

    useEffect(async () => {
        const fetchAggregatePlaces = async () => {
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
            const { aggregatePlaces } = result.data
            return aggregatePlaces
        }

        const data = await fetchAggregatePlaces()
        setAggregatePlaces(data)
    }, [])

    const context = {
        aggregatePlaces,
        setAggregatePlaces,
    }

    return (
        <AggregatePlacesContext.Provider value={context}>
            {children}
        </AggregatePlacesContext.Provider>
    )
}

AggregatePlacesProvider.propTypes = {
    children: PropTypes.node,
}

export { AggregatePlacesContext, AggregatePlacesProvider }
