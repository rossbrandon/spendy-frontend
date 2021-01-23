import germany from 'assets/images/flags/germany.jpg'
import italy from 'assets/images/flags/italy.jpg'
import russia from 'assets/images/flags/russia.jpg'
import spain from 'assets/images/flags/spain.jpg'
import usFlag from 'assets/images/flags/us.jpg'

const languages = {
    es: {
        localeString: 'es-ES',
        label: 'Spanish',
        flag: spain,
        currency: 'EUR',
    },
    de: {
        localeString: 'de-DE',
        label: 'German',
        flag: germany,
        currency: 'EUR',
    },
    it: {
        localeString: 'it-IT',
        label: 'Italian',
        flag: italy,
        currency: 'EUR',
    },
    ru: {
        localeString: 'ru-RU',
        label: 'Russian',
        flag: russia,
        currency: 'RUB',
    },
    en: {
        localeString: 'en-US',
        label: 'English',
        flag: usFlag,
        currency: 'USD',
    },
}

export default languages
