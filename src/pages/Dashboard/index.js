import BudgetCard from 'components/BudgetCard'
import Layout from 'components/Layout'
import MonthSwitcher from 'components/MonthSwitcher'
import ProgressBar from 'components/ProgressBar'
import { useBudgets, useLocale } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, Col, Container, Media, Row } from 'reactstrap'

const Dashboard = () => {
    const { t } = useTranslation()
    const { budgets } = useBudgets()
    const { currency, localeString } = useLocale()

    budgets.sort((a, b) => a.sortOrder > b.sortOrder)

    const totalBudget =
        budgets.length > 0
            ? budgets.reduce((tb, { amount }) => tb + amount, 0)
            : 0
    const totalSpent =
        budgets.length > 0
            ? budgets.reduce(
                  (ts, { sum }) => ts + (sum.length ? sum[0].total : 0),
                  0,
              )
            : 0
    const totalRemaining = totalBudget - totalSpent
    const remainingClass = totalRemaining >= 0 ? 'text-success' : 'text-danger'

    return (
        <Layout>
            <div className="page-content">
                <Container fluid>
                    <MonthSwitcher />
                    <h4>{t('Dashboard')}</h4>
                    <Row>
                        <Col xl="12">
                            <ProgressBar
                                totalBudget={totalBudget}
                                totalSpent={totalSpent}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="12">
                            <Row>
                                <Col sm="4">
                                    <Link
                                        to={{
                                            pathname: `/budgets`,
                                        }}
                                        className="text-dark"
                                    >
                                        <Card className="mini-stats-wid">
                                            <CardBody>
                                                <Media>
                                                    <div className="mr-3 align-self-center">
                                                        <i className="bx bx-purchase-tag h2 text-warning mb-0" />
                                                    </div>
                                                    <Media body>
                                                        <p className="text-muted mb-2">
                                                            {t('Total Budget')}
                                                        </p>
                                                        <h5 className="mb-0">
                                                            {totalBudget.toLocaleString(
                                                                localeString,
                                                                {
                                                                    style:
                                                                        'currency',
                                                                    currency,
                                                                },
                                                            )}
                                                        </h5>
                                                    </Media>
                                                </Media>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col sm="4">
                                    <Card className="mini-stats-wid">
                                        <CardBody>
                                            <Media>
                                                <div className="mr-3 align-self-center">
                                                    <i
                                                        className={`bx bx-wallet h2 text-primary mb-0`}
                                                    />
                                                </div>
                                                <Media body>
                                                    <p className="text-muted mb-2">
                                                        {t('Total Spent')}
                                                    </p>
                                                    <h5 className="mb-0">
                                                        {totalSpent.toLocaleString(
                                                            localeString,
                                                            {
                                                                style:
                                                                    'currency',
                                                                currency,
                                                            },
                                                        )}
                                                    </h5>
                                                </Media>
                                            </Media>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="4">
                                    <Card className="mini-stats-wid">
                                        <CardBody>
                                            <Media>
                                                <div className="mr-3 align-self-center">
                                                    <i
                                                        className={`bx bx-dollar-circle h2 ${remainingClass} mb-0`}
                                                    />
                                                </div>
                                                <Media body>
                                                    <p className="text-muted mb-2">
                                                        {t('Total Remaining')}
                                                    </p>
                                                    <h5 className="mb-0">
                                                        {totalRemaining.toLocaleString(
                                                            localeString,
                                                            {
                                                                style:
                                                                    'currency',
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
                    </Row>

                    <h4>{t('Budgets')}</h4>
                    <Row>
                        {budgets.map((budget, i) => {
                            return (
                                <BudgetCard
                                    budget={budget}
                                    key={'_budget_' + i}
                                />
                            )
                        })}

                        {!budgets.length > 0 && (
                            <Col>
                                <Row className="mb-4">
                                    <h2 className="m-auto">
                                        {t(
                                            "Looks like you don't have any budgets yet...",
                                        )}
                                    </h2>
                                </Row>
                                <Row>
                                    <div className="m-auto text-center">
                                        <Link to="/budgets">
                                            <Button
                                                type="button"
                                                color="primary"
                                                className="btn-rounded waves-effect waves-light float-right"
                                            >
                                                {t('Manage Your Budgets')}
                                            </Button>
                                        </Link>
                                    </div>
                                </Row>
                            </Col>
                        )}
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default Dashboard
