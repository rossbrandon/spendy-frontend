import { AllBudgetsContext } from 'context'
import { useContext } from 'react'

const useAllBudgets = () => {
    const allBudgetsContext = useContext(AllBudgetsContext)
    return allBudgetsContext
}

export default useAllBudgets
