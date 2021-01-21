import React from 'react'
import { Button, Row, Col } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
} from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import ExpenseSearchColumns from './ExpenseSearchColumns'
import { useBudgets, useAllExpenses } from 'hooks'
import { useTranslation } from 'react-i18next'

const ExpenseSearchTable = () => {
    const { t } = useTranslation()
    const { budgets } = useBudgets()
    const { allExpenses } = useAllExpenses()

    const { SearchBar } = Search

    const pageOptions = {
        sizePerPage: 50,
        totalSize: budgets.length,
        custom: true,
    }

    return (
        <React.Fragment>
            <PaginationProvider pagination={paginationFactory(pageOptions)}>
                {({ paginationProps, paginationTableProps }) => (
                    <ToolkitProvider
                        keyField="_id"
                        data={allExpenses || []}
                        columns={ExpenseSearchColumns()}
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
                                                sort={{
                                                    dataField: 'date',
                                                    order: 'asc',
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    {!allExpenses.length > 0 && (
                                        <h3 className="m-auto">
                                            {t('No expenses found yet!')}
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
