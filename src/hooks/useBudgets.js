import { useContext } from 'react'
import { BudgetsContext } from '../context'

const useBudgets = () => {
    const budgetsContext = useContext(BudgetsContext)
    return budgetsContext
}

export default useBudgets
