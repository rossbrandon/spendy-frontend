import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Layout = props => {
    const [isMenuOpened, setIsMenuOpened] = useState(false)

    document.body.setAttribute('data-topbar', 'dark')
    document.body.removeAttribute('data-sidebar')
    document.body.removeAttribute('data-sidebar-size')
    document.body.setAttribute('data-layout', 'horizontal')
    document.title = 'Spendy'

    const openMenu = () => {
        setIsMenuOpened(!isMenuOpened)
    }

    return (
        <div id="layout-wrapper">
            <Header
                theme={props.topbarTheme}
                isMenuOpened={isMenuOpened}
                openMenu={openMenu}
            />
            <Navbar isMenuOpened={isMenuOpened} budgets={props.budgets} />
            <div className="main-content">{props.children}</div>
            <Footer />
        </div>
    )
}

Layout.propTypes = {
    changeLayout: PropTypes.func,
    children: PropTypes.object,
    location: PropTypes.object,
    topbarTheme: PropTypes.any,
    budgets: PropTypes.array,
}

export default withRouter(Layout)
