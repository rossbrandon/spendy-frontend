import ExpenseModals from 'components/ExpenseModals'
import { useExpenses, useLocale } from 'hooks'
import { MDBDataTable } from 'mdbreact'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Badge, Button, Col, Row } from 'reactstrap'
import { getYearMonthDayString } from 'utils'

const ExpenseTable = props => {
    const { t } = useTranslation()
    const { expenses, budgets, currentBudget } = props
    const { refetchExpenseData, setRefetchExpenseData } = useExpenses()
    const { locale, currency } = useLocale()

    const [modalInfo, setModalInfo] = useState()
    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [cloneModal, setCloneModal] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)

    const toggleCreateModal = () => {
        setCreateModal(!createModal)
        setRefetchExpenseData(refetchExpenseData + 1)
    }

    const toggleEditModal = () => {
        setEditModal(!editModal)
        setShowConfirmation(false)
        setRefetchExpenseData(refetchExpenseData + 1)
    }

    const toggleCloneModal = () => {
        toggleEditModal()
        setCloneModal(!cloneModal)
        setRefetchExpenseData(refetchExpenseData + 1)
    }

    const rows = []
    expenses.map(expense => {
        const row = {}
        row.clickEvent = () => {
            setModalInfo(expense)
            toggleEditModal()
        }
        row.date = getYearMonthDayString(new Date(expense.date))
        row.place = expense.place
        row.price = expense.price.toLocaleString(locale, {
            style: 'currency',
            currency,
        })
        row.reason = expense.reason
        row.tagsSearch = expense.tags
        row.tags = expense.tags.map(tag => {
            return (
                <>
                    <Badge
                        className={'font-size-12 badge-soft-warning mr-1'}
                        color="warning"
                        pill
                    >
                        {tag}
                    </Badge>
                </>
            )
        })
        row.action = (
            <>
                <Button
                    type="button"
                    color="primary"
                    className="btn-sm btn-rounded"
                    onClick={toggleEditModal}
                >
                    {t('Edit Expense')}
                </Button>
                <Button
                    type="button"
                    color="light"
                    className="btn-sm btn-rounded ml-2"
                    onClick={toggleCloneModal}
                >
                    {t('Clone')}
                </Button>
            </>
        )
        rows.push(row)
    })
    rows.sort((a, b) => a.date > b.date)

    const data = {
        columns: [
            {
                field: 'date',
                label: t('Date'),
            },
            {
                field: 'place',
                label: t('Place'),
            },
            {
                field: 'price',
                label: t('Price'),
            },
            {
                field: 'reason',
                label: t('Reason'),
            },
            {
                field: 'tags',
                label: t('Tags'),
            },
            {
                field: 'action',
                label: t('Action'),
                sort: 'disabled',
            },
        ],
        rows,
    }

    return (
        <React.Fragment>
            <ExpenseModals
                budgets={budgets}
                currentBudget={currentBudget}
                modalInfo={modalInfo}
                createModal={createModal}
                toggleCreateModal={toggleCreateModal}
                editModal={editModal}
                toggleEditModal={toggleEditModal}
                cloneModal={cloneModal}
                toggleCloneModal={toggleCloneModal}
                showConfirmation={showConfirmation}
                setShowConfirmation={setShowConfirmation}
            />
            <Row className="mb-2">
                <Col xl="12">
                    <div className="text-sm-right float-right">
                        <Button
                            type="button"
                            color="success"
                            className="btn-rounded waves-effect waves-light float-right"
                            onClick={toggleCreateModal}
                        >
                            <i className="mdi mdi-plus mr-1" />
                            {t('Add New Expense')}
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="col-12">
                    <MDBDataTable
                        data={data}
                        searchLabel={t('Search')}
                        paginationLabel={[t('Previous'), t('Next')]}
                        infoLabel={[
                            t('Showing'),
                            t('to'),
                            t('of'),
                            t('entries'),
                        ]}
                        entries={25}
                        entriesOptions={[10, 25, 50, 100]}
                        entriesLabel={false}
                        noRecordsFoundLabel={t('No expenses found')}
                        noBottomColumns
                        responsive
                        hover
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}

ExpenseTable.propTypes = {
    expenses: PropTypes.object,
    budgets: PropTypes.object,
    currentBudget: PropTypes.object,
    modalInfo: PropTypes.object,
}

export default ExpenseTable
