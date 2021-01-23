import { LoadingContext } from 'context'
import { useContext } from 'react'

const useLoading = () => {
    const localContext = useContext(LoadingContext)
    return localContext
}

export default useLoading
