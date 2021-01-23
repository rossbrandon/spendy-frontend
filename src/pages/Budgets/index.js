import BudgetTable from 'components/BudgetTable'
import Layout from 'components/Layout'
import { useAllBudgets } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'

const Budgets = () => {
    const { t } = useTranslation()
    const { allBudgets } = useAllBudgets()

    return (
        <Layout>
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <h4>{t('My Budgets')}</h4>
                        <Row>
                            <Col xl="12">
                                <Card>
                                    <CardBody>
                                        <BudgetTable budgets={allBudgets} />
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
