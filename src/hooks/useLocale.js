import { LocaleContext } from 'context'
import { useContext } from 'react'

const useLocale = () => {
    const localContext = useContext(LocaleContext)
    return localContext
}

export default useLocale
