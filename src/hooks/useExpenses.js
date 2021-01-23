import { ExpensesContext } from 'context'
import { useContext } from 'react'

const useExpenses = () => {
    const expensesContext = useContext(ExpensesContext)
    return expensesContext
}

export default useExpenses
