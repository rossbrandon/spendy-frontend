import PropTypes from 'prop-types'
import React from 'react'
import { Col } from 'reactstrap'

const ProgressBar = props => {
    const { totalBudget, totalSpent, totalRemaining } = props

    const progressClass = totalBudget >= totalSpent ? 'bg-success' : 'bg-danger'
    const widthPercent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0

    return (
        <div className="progress mb-4">
            <div
                className={`progress-bar progress-bar-striped ${progressClass}`}
                role="progressbar"
                style={{ width: `${widthPercent}%` }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
            ></div>
        </div>
    )
}

ProgressBar.propTypes = {
    totalBudget: PropTypes.number,
    totalSpent: PropTypes.number,
    totalRemaining: PropTypes.number,
}

export default ProgressBar
