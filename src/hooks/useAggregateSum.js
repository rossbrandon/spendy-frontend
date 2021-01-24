import { AggregateSumContext } from 'context'
import { useContext } from 'react'

const useAggregateSum = () => {
    const aggregateSumContext = useContext(AggregateSumContext)
    return aggregateSumContext
}

export default useAggregateSum
