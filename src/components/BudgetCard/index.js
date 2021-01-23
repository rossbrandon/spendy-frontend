import { useLocale } from 'hooks'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Card, CardBody, Col } from 'reactstrap'

import ProgressBar from '../ProgressBar'

const BudgetCard = props => {
    const { budget } = props
    const { t } = useTranslation()
    const { currency, localeString } = useLocale()

    const totalSpent = budget.sum.length ? budget.sum[0].total : 0
    const spentClass =
        budget.amount >= totalSpent ? 'badge-success' : 'badge-danger'

    return (
        <React.Fragment>
            <Col xl="4" sm="6">
                <Link
                    to={{
                        pathname: `/expenses/${budget._id}`,
                    }}
                    className="text-dark"
                >
                    <Card className="text-center">
                        <CardBody>
                            <div className="avatar-sm mx-auto mb-4">
                                <span
                                    className={
                                        'avatar-title rounded-circle bg-soft-info text-info font-size-16'
                                    }
                                >
                                    {budget.name.charAt(0)}
                                </span>
                            </div>
                            <h5 className="font-size-18">{budget.name}</h5>
                            <div>
                                <p className="badge badge-info font-size-14 m-1">
                                    {t('Amount')}:{' '}
                                    {budget.amount.toLocaleString(
                                        localeString,
                                        {
                                            style: 'currency',
                                            currency,
                                        },
                                    )}
                                </p>
                                <p
                                    className={`badge ${spentClass} font-size-14 m-1`}
                                >
                                    {t('Spent')}:{' '}
                                    {totalSpent.toLocaleString(localeString, {
                                        style: 'currency',
                                        currency,
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
                </Link>
            </Col>
        </React.Fragment>
    )
}

BudgetCard.propTypes = {
    budget: PropTypes.object,
}

export default BudgetCard
