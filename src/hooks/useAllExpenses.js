import { useContext } from 'react'
import { AllExpensesContext } from 'context'

const useAllExpenses = () => {
    const allExpensesContext = useContext(AllExpensesContext)
    return allExpensesContext
}

export default useAllExpenses
