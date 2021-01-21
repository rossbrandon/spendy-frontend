import React from 'react'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import Layout from 'components/Layout'
import ExpenseSearchTable from 'components/ExpenseSearchTable'
import { useTranslation } from 'react-i18next'
import { AllExpensesProvider } from 'context'

const ExpenseSearch = () => {
    const { t } = useTranslation()

    return (
        <Layout>
            <div className="page-content">
                <Container fluid>
                    <h4>{t('All Expenses')}</h4>
                    <Row>
                        <Col xl="12">
                            <Card>
                                <CardBody>
                                    <AllExpensesProvider>
                                        <ExpenseSearchTable />
                                    </AllExpensesProvider>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default ExpenseSearch
