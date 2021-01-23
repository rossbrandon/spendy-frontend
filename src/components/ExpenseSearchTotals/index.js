import { useLocale } from 'hooks'
import { PropTypes } from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, Col, Media, Row } from 'reactstrap'

const ExpenseSearchTotals = props => {
    const { allExpenses } = props
    const { t } = useTranslation()
    const { currency, localeString } = useLocale()

    const totalSpent =
        allExpenses.length > 0
            ? allExpenses.reduce((ts, { price }) => ts + price, 0)
            : 0

    return (
        <Col xl="12">
            <Row>
                <Col sm="6">
                    <Card className="mini-stats-wid">
                        <CardBody>
                            <Media>
                                <div className="mr-3 align-self-center">
                                    <i className="bx bx-purchase-tag h2 text-primary mb-0" />
                                </div>
                                <Media body>
                                    <p className="text-muted mb-2">
                                        {t('Transactions')}
                                    </p>
                                    <h5 className="mb-0">
                                        {allExpenses.length}
                                    </h5>
                                </Media>
                            </Media>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="6">
                    <Card className="mini-stats-wid">
                        <CardBody>
                            <Media>
                                <div className="mr-3 align-self-center">
                                    <i className="bx bx-dollar-circle h2 text-info mb-0" />
                                </div>
                                <Media body>
                                    <p className="text-muted mb-2">
                                        {t('Total Spent')}
                                    </p>
                                    <h5 className="mb-0">
                                        {totalSpent.toLocaleString(
                                            localeString,
                                            {
                                                style: 'currency',
                                                currency,
                                            },
                                        )}
                                    </h5>
                                </Media>
                            </Media>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Col>
    )
}

ExpenseSearchTotals.propTypes = {
    allExpenses: PropTypes.array,
}

export default ExpenseSearchTotals
