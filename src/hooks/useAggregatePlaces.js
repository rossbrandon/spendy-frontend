import { AggregatePlacesContext } from 'context'
import { useContext } from 'react'

const useAggregatePlaces = () => {
    const aggregatePlacesContext = useContext(AggregatePlacesContext)
    return aggregatePlacesContext
}

export default useAggregatePlaces
