import { useAuth0 } from '@auth0/auth0-react'
import spendyLogo from 'assets/images/spendy_logo.png'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

import LanguageDropdown from '../LanguageDropdown'
import ProfileMenu from '../ProfileMenu'

const Header = props => {
    const { openMenu } = props
    const { isAuthenticated } = useAuth0()
    const routePath = isAuthenticated ? '/dashboard' : '/'

    return (
        <header id="page-topbar">
            <div className="navbar-header">
                <div className="d-flex">
                    <div className="navbar-brand-box">
                        <Link to={`${routePath}`} className="logo logo-light">
                            <span className="logo-sm">
                                <img src={spendyLogo} alt="" height="50" />
                            </span>
                            <span className="logo-lg">
                                <img src={spendyLogo} alt="" height="50" />
                            </span>
                        </Link>
                    </div>
                    <button
                        type="button"
                        className="btn btn-sm px-3 font-size-16 d-sm-none header-item waves-effect waves-light"
                        data-toggle="collapse"
                        onClick={() => {
                            openMenu()
                        }}
                        data-target="#topnav-menu-content"
                    >
                        <i className="fa fa-fw fa-bars" />
                    </button>
                </div>
                <div className="d-flex">
                    <LanguageDropdown />
                    <ProfileMenu />
                </div>
            </div>
        </header>
    )
}

Header.propTypes = {
    t: PropTypes.any,
    openMenu: PropTypes.func,
}

export default Header
