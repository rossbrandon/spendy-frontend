import PropTypes from 'prop-types'
import React, { createContext } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { getFirstDayOfCurrentMonth, getLastDayOfCurrentMonth } from 'utils'

const MonthSwitcherContext = createContext()

const MonthSwitcherProvider = ({ children }) => {
    const defaultStartDate = getFirstDayOfCurrentMonth()
    const defaultEndDate = getLastDayOfCurrentMonth()
    const [startDate, setStartDate] = useLocalStorageState(
        'startDate',
        defaultStartDate,
    )
    const [endDate, setEndDate] = useLocalStorageState(
        'endDate',
        defaultEndDate,
    )

    const context = {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
    }

    return (
        <MonthSwitcherContext.Provider value={context}>
            {children}
        </MonthSwitcherContext.Provider>
    )
}

MonthSwitcherProvider.propTypes = {
    children: PropTypes.node,
}

export { MonthSwitcherContext, MonthSwitcherProvider }
