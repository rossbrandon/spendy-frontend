import React, { createContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import useLocalStorageState from 'use-local-storage-state'
import languages from 'common/languages'

const LocaleContext = createContext()

const LocaleProvider = ({ children }) => {
    const [locale, setLocale] = useLocalStorageState(
        'locale',
        localStorage.getItem('I18N_LANGUAGE'),
    )
    const [currency, setCurrency] = useLocalStorageState(
        'currency',
        languages['en'].currency,
    )
    const [localeString, setLocaleString] = useLocalStorageState(
        'localeString',
        languages['en'].localeString,
    )

    useEffect(() => {
        localStorage.setItem('I18N_LANGUAGE', locale)
        setCurrency(languages[locale].currency)
    }, [locale])

    const context = {
        locale,
        setLocale,
        currency,
        setCurrency,
        localeString,
        setLocaleString,
    }

    return (
        <LocaleContext.Provider value={context}>
            {children}
        </LocaleContext.Provider>
    )
}

LocaleProvider.propTypes = {
    children: PropTypes.node,
}

export { LocaleContext, LocaleProvider }
