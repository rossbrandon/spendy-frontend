import { useContext } from 'react'
import { AggregateContext } from 'context'

const useAggregate = () => {
    const aggregateContext = useContext(AggregateContext)
    return aggregateContext
}

export default useAggregate
