import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
} from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import BudgetColumns from 'components/BudgetTable/BudgetColumns'
import BudgetModals from 'components/BudgetModals'
import { useBudgets } from 'hooks'
import { useTranslation } from 'react-i18next'

const BudgetTable = props => {
    const { t } = useTranslation()
    const { budgets } = props
    const { refetchBudgetData, setRefetchBudgetData } = useBudgets()

    const [modalInfo, setModalInfo] = useState()
    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)

    const { SearchBar } = Search

    const toggleCreateModal = () => {
        setCreateModal(!createModal)
        setRefetchBudgetData(refetchBudgetData + 1)
    }

    const toggleEditModal = () => {
        setEditModal(!editModal)
        setShowConfirmation(false)
        setRefetchBudgetData(refetchBudgetData + 1)
    }

    const pageOptions = {
        sizePerPage: 10,
        totalSize: budgets.length,
        custom: true,
    }

    const rowEvents = {
        onClick: (e, row) => {
            setModalInfo(row)
            toggleEditModal()
        },
    }

    return (
        <React.Fragment>
            <BudgetModals
                budgets={budgets}
                modalInfo={modalInfo}
                createModal={createModal}
                toggleCreateModal={toggleCreateModal}
                editModal={editModal}
                toggleEditModal={toggleEditModal}
                showConfirmation={showConfirmation}
                setShowConfirmation={setShowConfirmation}
            />
            <PaginationProvider pagination={paginationFactory(pageOptions)}>
                {({ paginationProps, paginationTableProps }) => (
                    <ToolkitProvider
                        keyField="_id"
                        data={budgets || []}
                        columns={BudgetColumns(toggleEditModal)}
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
                                                {t('Add New Budget')}
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
                                                hover
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

BudgetTable.propTypes = {
    budgets: PropTypes.object,
    modalInfo: PropTypes.object,
}

export default BudgetTable
