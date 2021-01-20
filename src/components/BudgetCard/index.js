import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, Col } from 'reactstrap'
import ProgressBar from '../ProgressBar'

const BudgetCard = props => {
    const { budget } = props

    const totalSpent = budget.sum.length ? budget.sum[0].total : 0
    const spentClass =
        budget.amount >= totalSpent ? 'badge-success' : 'badge-danger'

    return (
        <React.Fragment>
            <Col xl="4" sm="6">
                <Card className="text-center">
                    <CardBody>
                        <div className="avatar-sm mx-auto mb-4">
                            <Link
                                to={{
                                    pathname: `/expenses/${budget._id}`,
                                }}
                                className="text-dark"
                            >
                                <span
                                    className={
                                        'avatar-title rounded-circle bg-soft-info text-info font-size-16'
                                    }
                                >
                                    {budget.name.charAt(0)}
                                </span>
                            </Link>
                        </div>
                        <h5 className="font-size-18">
                            <Link
                                to={{
                                    pathname: `/expenses/${budget._id}`,
                                }}
                                className="text-dark"
                            >
                                {budget.name}
                            </Link>
                        </h5>
                        <div>
                            <p className="badge badge-info font-size-14 m-1">
                                Amount:{' '}
                                {budget.amount.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}
                            </p>
                            <p
                                className={`badge ${spentClass} font-size-14 m-1`}
                            >
                                Spent:{' '}
                                {totalSpent.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}
                            </p>
                        </div>
                        <div className="mt-5">
                            <ProgressBar
                                totalBudget={budget.amount}
                                totalSpent={totalSpent}
                            />
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    )
}

BudgetCard.propTypes = {
    budget: PropTypes.object,
}

export default BudgetCard
