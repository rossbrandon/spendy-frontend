import { useBudgets } from 'hooks'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { Collapse } from 'reactstrap'

const Navbar = props => {
    const { budgets } = useBudgets()

    const shouldShowBudgetInMenu = budget => {
        const compareStartDate = new Date(budget.startDate)
        const compareEndDate = new Date(budget.endDate)
        if (
            budget.showInMenu === true &&
            compareStartDate <= new Date() &&
            (!budget.endDate || compareEndDate >= new Date())
        ) {
            return true
        }
        return false
    }

    const menuBudgets = budgets
        .filter(budget => shouldShowBudgetInMenu(budget))
        .slice(0, 10)
    menuBudgets.sort((a, b) => a.sortOrder > b.sortOrder)

    return (
        <div className="topnav">
            <div className="container-fluid">
                <nav
                    className="navbar navbar-light navbar-expand-sm topnav-menu"
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
}

export default Navbar
