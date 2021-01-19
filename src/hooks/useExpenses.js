import { useContext } from 'react'
import { ExpensesContext } from 'context'

const useExpenses = () => {
    const expensesContext = useContext(ExpensesContext)
    return expensesContext
}

export default useExpenses
