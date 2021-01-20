import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { Collapse } from 'reactstrap'
import { useBudgets } from 'hooks'
import { withTranslation } from 'react-i18next'

const Navbar = props => {
    const { budgets } = useBudgets()

    const menuBudgets = budgets
        .filter(budget => budget.showInMenu === true)
        .slice(0, 5)

    return (
        <div className="topnav">
            <div className="container-fluid">
                <nav
                    className="navbar navbar-light navbar-expand-lg topnav-menu"
                    id="navigation"
                >
                    <Collapse
                        isOpen={props.isMenuOpened}
                        className="navbar-collapse"
                        id="topnav-menu-content"
                    >
                        <ul className="navbar-nav">
                            {menuBudgets.map((budget, i) => {
                                return (
                                    <li
                                        className="nav-item"
                                        key={'_navItem_' + i}
                                    >
                                        <Link
                                            to={{
                                                pathname: `/expenses/${budget._id}`,
                                            }}
                                            className="nav-link"
                                        >
                                            <i className="bx mr"></i>
                                            {budget.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </Collapse>
                </nav>
            </div>
        </div>
    )
}

Navbar.propTypes = {
    isMenuOpened: PropTypes.bool,
    t: PropTypes.any,
}

export default withTranslation()(Navbar)
