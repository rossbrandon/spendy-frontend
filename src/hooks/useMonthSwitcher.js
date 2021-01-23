import { MonthSwitcherContext } from 'context'
import { useContext } from 'react'

const useMonthSwitcher = () => {
    const monthSwitcherContext = useContext(MonthSwitcherContext)
    return monthSwitcherContext
}

export default useMonthSwitcher
