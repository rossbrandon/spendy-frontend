import { useContext } from 'react'
import { LocaleContext } from 'context'

const useLocale = () => {
    const localContext = useContext(LocaleContext)
    return localContext
}

export default useLocale
