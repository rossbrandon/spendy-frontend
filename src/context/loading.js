import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)

    const context = {
        isLoading,
        setIsLoading,
    }

    return (
        <LoadingContext.Provider value={context}>
            {children}
        </LoadingContext.Provider>
    )
}

LoadingProvider.propTypes = {
    children: PropTypes.node,
}

export { LoadingContext, LoadingProvider }
