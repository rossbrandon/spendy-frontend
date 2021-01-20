import React from 'react'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import { useBudgets } from 'hooks'
import Layout from 'components/Layout'
import BudgetTable from 'components/BudgetTable'

const Budgets = () => {
    const { budgets } = useBudgets()

    return (
        <Layout>
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <h4>My Budgets</h4>
                        <Row>
                            <Col xl="12">
                                <Card>
                                    <CardBody>
                                        <BudgetTable budgets={budgets} />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        </Layout>
    )
}

export default Budgets
