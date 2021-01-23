import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationDE from './assets/translations/de.json'
import translationEN from './assets/translations/en.json'
import translationES from './assets/translations/es.json'
import translationIT from './assets/translations/it.json'
import translationRU from './assets/translations/ru.json'

// the translations
const resources = {
    de: {
        translation: translationDE,
    },
    it: {
        translation: translationIT,
    },
    ru: {
        translation: translationRU,
    },
    es: {
        translation: translationES,
    },
    en: {
        translation: translationEN,
    },
}

const language = localStorage.getItem('I18N_LANGUAGE')
if (!language) {
    localStorage.setItem('I18N_LANGUAGE', 'en')
}

i18n.use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: localStorage.getItem('I18N_LANGUAGE') || 'en',
        fallbackLng: 'en', // use en if detected lng is not available

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    })

export default i18n
