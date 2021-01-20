import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Card, CardBody, Media } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
} from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import ExpensesColumns from '../../components/ExpensesColumns/ExpensesColumns'
import ViewExpenseModal from '../../components/ViewExpenseModal/ViewExpenseModal'
import CreateExpenseModal from '../../components/CreateExpenseModal/CreateExpenseModal'
import EditExpenseModal from '../../components/EditExpenseModal/EditExpenseModal'
import DeleteExpenseModal from '../../components/DeleteExpenseModal/DeleteExpenseModal'
import { useParams } from 'react-router-dom'
import { useBudgets, useExpenses } from 'hooks'
import MonthSwitcher from 'components/MonthSwitcher'
import Layout from '../../components/Layout/Layout'

const Expenses = () => {
    const paramBudgetId = useParams('budgetId')?.budgetId
    const { budgets } = useBudgets()
    const { expenses, setBudgetId, refetchData, setRefetchData } = useExpenses()

    useEffect(() => {
        setBudgetId(paramBudgetId)
    }, [paramBudgetId])

    const budget = budgets.find(b => b._id == paramBudgetId)

    const { SearchBar } = Search

    const totalBudget = budget.amount
    const totalSpent = budget.sum.length ? budget.sum[0].total : 0
    const totalRemaining = totalBudget - totalSpent
    const remainingClass = totalRemaining >= 0 ? 'text-info' : 'text-danger'
    const pageOptions = {
        sizePerPage: 10,
        totalSize: expenses.length,
        custom: true,
    }

    const [viewModal, setViewModal] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [modalInfo, setModalInfo] = useState()

    const toggleViewModal = () => {
        setViewModal(!viewModal)
    }

    const toggleCreateModal = () => {
        setCreateModal(!createModal)
        setRefetchData(refetchData + 1)
    }

    const toggleEditModal = () => {
        setEditModal(!editModal)
        setRefetchData(refetchData + 1)
    }

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal)
        setRefetchData(refetchData + 1)
    }

    const rowEvents = {
        onClick: (e, row) => {
            setModalInfo(row)
        },
    }

    return (
        <Layout>
            <React.Fragment>
                <ViewExpenseModal
                    isOpen={viewModal}
                    toggle={toggleViewModal}
                    currentBudget={budget}
                    expense={modalInfo}
                />
                <CreateExpenseModal
                    isOpen={createModal}
                    toggle={toggleCreateModal}
                    budgets={budgets}
                    currentBudget={budget}
                />
                <EditExpenseModal
                    isOpen={editModal}
                    toggle={toggleEditModal}
                    budgets={budgets}
                    currentBudget={budget}
                    expense={modalInfo}
                />
                <DeleteExpenseModal
                    isOpen={deleteModal}
                    toggle={toggleDeleteModal}
                    expense={modalInfo}
                />
                <div className="page-content">
                    <Container fluid>
                        <MonthSwitcher />
                        <h4>{budget.name}</h4>
                        <Row>
                            <Col xl="12">
                                <Row>
                                    <Col sm="3">
                                        <Card className="mini-stats-wid">
                                            <CardBody>
                                                <Media>
                                                    <div className="mr-3 align-self-center">
                                                        <i className="mdi mdi-ethereum h2 text-success mb-0" />
                                                    </div>
                                                    <Media body>
                                                        <p className="text-muted mb-2">
                                                            Transations
                                                        </p>
                                                        <h5 className="mb-0">
                                                            {expenses.length}
                                                        </h5>
                                                    </Media>
                                                </Media>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="3">
                                        <Card className="mini-stats-wid">
                                            <CardBody>
                                                <Media>
                                                    <div className="mr-3 align-self-center">
                                                        <i className="mdi mdi-ethereum h2 text-warning mb-0" />
                                                    </div>
                                                    <Media body>
                                                        <p className="text-muted mb-2">
                                                            Budget
                                                        </p>
                                                        <h5 className="mb-0">
                                                            {totalBudget.toLocaleString(
                                                                'en-US',
                                                                {
                                                                    style:
                                                                        'currency',
                                                                    currency:
                                                                        'USD',
                                                                },
                                                            )}
                                                        </h5>
                                                    </Media>
                                                </Media>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="3">
                                        <Card className="mini-stats-wid">
                                            <CardBody>
                                                <Media>
                                                    <div className="mr-3 align-self-center">
                                                        <i className="mdi mdi-ethereum h2 text-info mb-0" />
                                                    </div>
                                                    <Media body>
                                                        <p className="text-muted mb-2">
                                                            Spent
                                                        </p>
                                                        <h5 className="mb-0">
                                                            {totalSpent.toLocaleString(
                                                                'en-US',
                                                                {
                                                                    style:
                                                                        'currency',
                                                                    currency:
                                                                        'USD',
                                                                },
                                                            )}
                                                        </h5>
                                                    </Media>
                                                </Media>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="3">
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
                                                            Remaining
                                                        </p>
                                                        <h5 className="mb-0">
                                                            {totalRemaining.toLocaleString(
                                                                'en-US',
                                                                {
                                                                    style:
                                                                        'currency',
                                                                    currency:
                                                                        'USD',
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

                        <Row>
                            <Col xl="12">
                                <Card>
                                    {expenses && (
                                        <CardBody>
                                            <PaginationProvider
                                                pagination={paginationFactory(
                                                    pageOptions,
                                                )}
                                            >
                                                {({
                                                    paginationProps,
                                                    paginationTableProps,
                                                }) => (
                                                    <ToolkitProvider
                                                        keyField="_id"
                                                        data={expenses || []}
                                                        columns={ExpensesColumns(
                                                            toggleViewModal,
                                                            toggleEditModal,
                                                            toggleDeleteModal,
                                                        )}
                                                        bootstrap4
                                                        search
                                                    >
                                                        {toolkitProps => (
                                                            <React.Fragment>
                                                                <Row className="mb-2">
                                                                    <Col sm="4">
                                                                        <div className="search-box mr-2 mb-2 d-inline-block">
                                                                            <div className="position-relative">
                                                                                <SearchBar
                                                                                    {...toolkitProps.searchProps}
                                                                                />
                                                                                <i className="bx bx-search-alt search-icon" />
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col sm="8">
                                                                        <div className="text-sm-right">
                                                                            <Button
                                                                                type="button"
                                                                                color="success"
                                                                                className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                                                                onClick={
                                                                                    toggleCreateModal
                                                                                }
                                                                            >
                                                                                <i className="mdi mdi-plus mr-1" />
                                                                                Add
                                                                                New
                                                                                Expense
                                                                            </Button>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xl="12">
                                                                        <div className="table-responsive">
                                                                            <BootstrapTable
                                                                                responsive
                                                                                bordered={
                                                                                    false
                                                                                }
                                                                                striped={
                                                                                    false
                                                                                }
                                                                                classes={
                                                                                    'table table-centered table-nowrap'
                                                                                }
                                                                                headerWrapperClasses={
                                                                                    'thead-light'
                                                                                }
                                                                                {...toolkitProps.baseProps}
                                                                                {...paginationTableProps}
                                                                                rowEvents={
                                                                                    rowEvents
                                                                                }
                                                                                sort={{
                                                                                    dataField:
                                                                                        'date',
                                                                                    order:
                                                                                        'asc',
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    {!expenses.length >
                                                                        0 && (
                                                                        <h3 className="m-auto">
                                                                            No
                                                                            expenses
                                                                            found
                                                                            yet!
                                                                        </h3>
                                                                    )}
                                                                </Row>
                                                                <Row className="align-items-md-center mt-30">
                                                                    <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                                                        <PaginationListStandalone
                                                                            {...paginationProps}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </React.Fragment>
                                                        )}
                                                    </ToolkitProvider>
                                                )}
                                            </PaginationProvider>
                                        </CardBody>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        </Layout>
    )
}

export default Expenses
