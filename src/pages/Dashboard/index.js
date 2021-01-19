import React from 'react'
import { Container, Row, Col, Card, CardBody, Media } from 'reactstrap'
import BudgetCard from '../../components/BudgetCard/BudgetCard'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { useBudgets } from 'hooks'
import MonthSwitcher from 'components/MonthSwitcher'
import Layout from '../../components/Layout/Layout'

const Dashboard = () => {
    const { budgets } = useBudgets()

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
    const remainingClass = totalRemaining >= 0 ? 'text-info' : 'text-danger'

    return (
        <Layout>
            <div className="page-content">
                <Container fluid>
                    <MonthSwitcher />
                    <h4>Dashboard</h4>
                    <Row>
                        <Col xl="12">
                            <ProgressBar
                                totalBudget={totalBudget}
                                totalSpent={totalSpent}
                                totalRemaining={totalRemaining}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="12">
                            <Row>
                                <Col sm="4">
                                    <Card className="mini-stats-wid">
                                        <CardBody>
                                            <Media>
                                                <div className="mr-3 align-self-center">
                                                    <i className="mdi mdi-ethereum h2 text-warning mb-0" />
                                                </div>
                                                <Media body>
                                                    <p className="text-muted mb-2">
                                                        Total Budget
                                                    </p>
                                                    <h5 className="mb-0">
                                                        {totalBudget.toLocaleString(
                                                            'en-US',
                                                            {
                                                                style:
                                                                    'currency',
                                                                currency: 'USD',
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
                                                        className={`mdi mdi-ethereum h2 text-primary mb-0`}
                                                    />
                                                </div>
                                                <Media body>
                                                    <p className="text-muted mb-2">
                                                        Total Spent
                                                    </p>
                                                    <h5 className="mb-0">
                                                        {totalSpent.toLocaleString(
                                                            'en-US',
                                                            {
                                                                style:
                                                                    'currency',
                                                                currency: 'USD',
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
                                                        className={`mdi mdi-ethereum h2 ${remainingClass} mb-0`}
                                                    />
                                                </div>
                                                <Media body>
                                                    <p className="text-muted mb-2">
                                                        Total Remaining
                                                    </p>
                                                    <h5 className="mb-0">
                                                        {totalRemaining.toLocaleString(
                                                            'en-US',
                                                            {
                                                                style:
                                                                    'currency',
                                                                currency: 'USD',
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

                    <h4>Budgets</h4>
                    <Row>
                        {budgets.map((budget, i) => {
                            return (
                                <BudgetCard
                                    budget={budget}
                                    key={'_budget_' + i}
                                />
                            )
                        })}
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default Dashboard
