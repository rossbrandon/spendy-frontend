import React, { useEffect } from 'react'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import { useParams } from 'react-router-dom'
import { useBudgets, useExpenses } from 'hooks'
import MonthSwitcher from 'components/MonthSwitcher'
import Layout from 'components/Layout'
import ExpenseTable from 'components/ExpenseTable'
import ExpenseTotals from 'components/ExpenseTotals'

const Expenses = () => {
    const paramBudgetId = useParams('budgetId')?.budgetId
    const { budgets } = useBudgets()
    const { expenses, setBudgetId } = useExpenses()

    useEffect(() => {
        setBudgetId(paramBudgetId)
    }, [paramBudgetId])

    const budget = budgets.find(b => b._id == paramBudgetId)

    return (
        <Layout>
            <div className="page-content">
                <Container fluid>
                    <MonthSwitcher />
                    <h4>{budget.name}</h4>
                    <Row>
                        <ExpenseTotals budget={budget} expenses={expenses} />
                    </Row>
                    <Row>
                        <Col xl="12">
                            <Card>
                                <CardBody>
                                    <ExpenseTable
                                        expenses={expenses}
                                        budgets={budgets}
                                        currentBudget={budget}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default Expenses
