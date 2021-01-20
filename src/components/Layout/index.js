import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../Navbar'
import Header from '../Header'
import Footer from '../Footer'

import 'toastr/build/toastr.min.css'

const Layout = props => {
    const [isMenuOpened, setIsMenuOpened] = useState(false)

    const { topbarTheme, children } = props

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
                theme={topbarTheme}
                isMenuOpened={isMenuOpened}
                openMenu={openMenu}
            />
            <Navbar isMenuOpened={isMenuOpened} />
            <div className="main-content">{children}</div>
            <Footer />
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.object,
    topbarTheme: PropTypes.any,
}

export default Layout
