import React, { useState } from 'react'
import { Button, Row, Col } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
} from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import ExpenseSearchColumns from './ExpenseSearchColumns'
import ExpenseModals from 'components/ExpenseModals'
import { useBudgets, useAllExpenses } from 'hooks'
import { useTranslation } from 'react-i18next'

const ExpenseSearchTable = () => {
    const { t } = useTranslation()
    const { budgets } = useBudgets()
    const { allExpenses } = useAllExpenses()
    const { refetchAllExpenseData, setRefetchAllExpenseData } = useAllExpenses()

    const [modalInfo, setModalInfo] = useState()
    const [viewModal, setViewModal] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const { SearchBar } = Search

    const toggleViewModal = () => {
        setViewModal(!viewModal)
    }

    const toggleCreateModal = () => {
        setCreateModal(!createModal)
        setRefetchAllExpenseData(refetchAllExpenseData + 1)
    }

    const toggleEditModal = () => {
        setEditModal(!editModal)
        setRefetchAllExpenseData(refetchAllExpenseData + 1)
    }

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal)
        setRefetchAllExpenseData(refetchAllExpenseData + 1)
    }

    const pageOptions = {
        sizePerPage: 50,
        totalSize: budgets.length,
        custom: true,
    }

    const rowEvents = {
        onClick: (e, row) => {
            setModalInfo(row)
        },
    }

    return (
        <React.Fragment>
            <ExpenseModals
                budgets={budgets}
                currentBudget={
                    modalInfo?.budget ? modalInfo.budget : budgets[0]
                }
                modalInfo={modalInfo}
                viewModal={viewModal}
                toggleViewModal={toggleViewModal}
                createModal={createModal}
                toggleCreateModal={toggleCreateModal}
                editModal={editModal}
                toggleEditModal={toggleEditModal}
                deleteModal={deleteModal}
                toggleDeleteModal={toggleDeleteModal}
            />
            <PaginationProvider pagination={paginationFactory(pageOptions)}>
                {({ paginationProps, paginationTableProps }) => (
                    <ToolkitProvider
                        keyField="_id"
                        data={allExpenses || []}
                        columns={ExpenseSearchColumns(
                            toggleViewModal,
                            toggleEditModal,
                            toggleDeleteModal,
                        )}
                        bootstrap4
                        search={{ placeholder: `${t('Search')}` }}
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
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm="8">
                                        <div className="text-sm-right">
                                            <Button
                                                type="button"
                                                color="success"
                                                className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                                onClick={toggleCreateModal}
                                            >
                                                <i className="mdi mdi-plus mr-1" />
                                                {t('Add New Expense')}
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl="12">
                                        <div className="table-responsive">
                                            <BootstrapTable
                                                responsive
                                                bordered={false}
                                                striped={false}
                                                classes={
                                                    'table table-centered table-nowrap'
                                                }
                                                headerWrapperClasses={
                                                    'thead-light'
                                                }
                                                {...toolkitProps.baseProps}
                                                {...paginationTableProps}
                                                rowEvents={rowEvents}
                                                sort={{
                                                    dataField: 'date',
                                                    order: 'asc',
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    {!allExpenses.length > 0 && (
                                        <h3 className="m-auto">
                                            {t('No allExpenses found yet!')}
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
        </React.Fragment>
    )
}

export default ExpenseSearchTable
