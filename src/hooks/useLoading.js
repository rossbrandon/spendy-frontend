import { useContext } from 'react'
import { LoadingContext } from 'context'

const useLoading = () => {
    const localContext = useContext(LoadingContext)
    return localContext
}

export default useLoading
