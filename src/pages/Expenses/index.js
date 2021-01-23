import ExpenseTable from 'components/ExpenseTable'
import ExpenseTotals from 'components/ExpenseTotals'
import Layout from 'components/Layout'
import MonthSwitcher from 'components/MonthSwitcher'
import { useBudgets, useExpenses, useMonthSwitcher } from 'hooks'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardBody,Col, Container, Row } from 'reactstrap'

const Expenses = () => {
    const { budgetId, startDateOverride, endDateOverride } = useParams()
    const { budgets } = useBudgets()
    const { expenses, setBudgetId } = useExpenses()
    const { setStartDate, setEndDate } = useMonthSwitcher()

    useEffect(() => {
        setBudgetId(budgetId)
    }, [budgetId])

    useEffect(() => {
        if (startDateOverride && endDateOverride) {
            setStartDate(startDateOverride)
            setEndDate(endDateOverride)
        }
    }, [startDateOverride])

    const budget = budgets.find(b => b._id == budgetId)

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
