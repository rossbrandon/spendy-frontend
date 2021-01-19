import { useContext } from 'react'
import { MonthSwitcherContext } from '../context'

const useMonthSwitcher = () => {
    const monthSwitcherContext = useContext(MonthSwitcherContext)
    return monthSwitcherContext
}

export default useMonthSwitcher
