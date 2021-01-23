import ExpenseSearchTable from 'components/ExpenseSearchTable'
import ExpenseSearchTotals from 'components/ExpenseSearchTotals'
import Layout from 'components/Layout'
import { AllExpensesProvider } from 'context'
import { useAllExpenses } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'

const ExpenseSearch = () => {
    const { t } = useTranslation()
    const { allExpenses } = useAllExpenses()

    return (
        <Layout>
            <AllExpensesProvider>
                <div className="page-content">
                    <Container fluid>
                        <h4>{t('All Expenses')}</h4>
                        <Row>
                            <ExpenseSearchTotals allExpenses={allExpenses} />
                        </Row>
                        <Row>
                            <Col xl="12">
                                <Card>
                                    <CardBody>
                                        <ExpenseSearchTable
                                            allExpenses={allExpenses}
                                        />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </AllExpensesProvider>
        </Layout>
    )
}

export default ExpenseSearch
