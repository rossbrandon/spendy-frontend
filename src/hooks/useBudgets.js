import { BudgetsContext } from 'context'
import { useContext } from 'react'

const useBudgets = () => {
    const budgetsContext = useContext(BudgetsContext)
    return budgetsContext
}

export default useBudgets
