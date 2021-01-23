import { AggregateContext } from 'context'
import { useContext } from 'react'

const useAggregate = () => {
    const aggregateContext = useContext(AggregateContext)
    return aggregateContext
}

export default useAggregate
