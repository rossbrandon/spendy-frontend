import { AggregateTagsContext } from 'context'
import { useContext } from 'react'

const useAggregateTags = () => {
    const aggregateTagsContext = useContext(AggregateTagsContext)
    return aggregateTagsContext
}

export default useAggregateTags
