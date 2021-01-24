import { useAuth0 } from '@auth0/auth0-react'
import { config } from 'config'
import PropTypes from 'prop-types'
import React, { createContext, useEffect, useState } from 'react'
import { showToast } from 'utils'

const getQuery = () => {
    return {
        query: `
            query {
                aggregateTags {
                    tag
                    count
                }
            }
        `,
    }
}

const AggregateTagsContext = createContext()

const AggregateTagsProvider = ({ children }) => {
    const { getAccessTokenSilently } = useAuth0()
    const [aggregateTags, setAggregateTags] = useState([])

    useEffect(async () => {
        const fetchAggregateTags = async () => {
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
            const { aggregateTags } = result.data
            return aggregateTags
        }

        const data = await fetchAggregateTags()
        setAggregateTags(data)
    }, [])

    const context = {
        aggregateTags,
        setAggregateTags,
    }

    return (
        <AggregateTagsContext.Provider value={context}>
            {children}
        </AggregateTagsContext.Provider>
    )
}

AggregateTagsProvider.propTypes = {
    children: PropTypes.node,
}

export { AggregateTagsContext, AggregateTagsProvider }
