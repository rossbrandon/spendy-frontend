import languages from 'common/languages'
import { useLocale } from 'hooks'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from 'reactstrap'

const LanguageDropdown = () => {
    const { t, i18n } = useTranslation()
    const { locale, setLocale } = useLocale()
    const [menu, setMenu] = useState(false)

    const changeLanguageAction = lang => {
        i18n.changeLanguage(lang)
        setLocale(lang)
    }

    const toggle = () => {
        setMenu(!menu)
    }

    return (
        <>
            <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block">
                <DropdownToggle
                    className="btn header-item waves-effect"
                    tag="button"
                >
                    <img
                        src={languages[locale]?.flag}
                        alt="Flag"
                        height="16"
                        className="mr-1"
                    />
                </DropdownToggle>
                <DropdownMenu className="language-switch" right>
                    {Object.keys(languages).map(key => {
                        return (
                            <DropdownItem
                                key={key}
                                onClick={() => changeLanguageAction(key)}
                                className={`notify-item ${
                                    locale === key ? 'active' : 'none'
                                }`}
                            >
                                <img
                                    src={languages[key]?.flag}
                                    alt="Flag"
                                    className="mr-1"
                                    height="12"
                                />
                                <span className="align-middle">
                                    {t(`${languages[key]?.label}`)}
                                </span>
                            </DropdownItem>
                        )
                    })}
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

export default LanguageDropdown
