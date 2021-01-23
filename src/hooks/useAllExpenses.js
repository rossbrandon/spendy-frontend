import { AllExpensesContext } from 'context'
import { useContext } from 'react'

const useAllExpenses = () => {
    const allExpensesContext = useContext(AllExpensesContext)
    return allExpensesContext
}

export default useAllExpenses
