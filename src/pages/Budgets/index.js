import React, { useState } from 'react'
import { Button, Container, Row, Col, Card, CardBody } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
} from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import HorizontalLayout from '../../components/Layout/Layout'
import BudgetsColumns from '../../components/BudgetsColumns/BudgetsColumns'
import ViewBudgetModal from '../../components/ViewBudgetModal/ViewBudgetModal'
import CreateBudgetModal from '../../components/CreateBudgetModal/CreateBudgetModal'
import EditBudgetModal from '../../components/EditBudgetModal/EditBudgetModal'
import DeleteBudgetModal from '../../components/DeleteBudgetModal/DeleteBudgetModal'
import { useBudgets } from 'hooks'

const Budgets = () => {
    const { budgets, refetchData, setRefetchData } = useBudgets()

    const [viewModal, setViewModal] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [modalInfo, setModalInfo] = useState()

    const { SearchBar } = Search

    const pageOptions = {
        sizePerPage: 10,
        totalSize: budgets.length,
        custom: true,
    }

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
            console.log(row)
            setModalInfo(row)
        },
    }

    return (
        <React.Fragment>
            <HorizontalLayout budgets={budgets} />
            <ViewBudgetModal
                isOpen={viewModal}
                toggle={toggleViewModal}
                budget={modalInfo}
            />
            <CreateBudgetModal
                isOpen={createModal}
                toggle={toggleCreateModal}
                budgets={budgets}
            />
            <EditBudgetModal
                isOpen={editModal}
                toggle={toggleEditModal}
                budgets={budgets}
                budget={modalInfo}
            />
            <DeleteBudgetModal
                isOpen={deleteModal}
                toggle={toggleDeleteModal}
                budget={modalInfo}
            />
            <div className="page-content">
                <Container fluid>
                    <h4>My Budgets</h4>
                    <Row>
                        <Col xl="12">
                            <Card>
                                {`budgets` && (
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
                                                    data={budgets || []}
                                                    columns={BudgetsColumns(
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
                                                                            Budget
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
    )
}

export default Budgets
