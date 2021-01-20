import React from 'react'
import { Button } from 'reactstrap'

const getFormattedDate = date => {
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    utcDate.setDate(utcDate.getDate())
    const dayIndex = utcDate.getDay()
    const dayName = days[dayIndex]
    const monthName = utcDate.toLocaleString('default', { month: 'long' })
    return `${dayName}, ${monthName} ${utcDate.getDate()}`
}

const BudgetsColumns = (
    toggleViewModal,
    toggleEditModal,
    toggleDeleteModal,
) => [
    {
        dataField: '_id',
        hidden: true,
        text: '',
    },
    {
        dataField: 'name',
        text: 'Name',
        sort: true,
    },
    {
        dataField: 'amount',
        text: 'Amount',
        sort: true,
        formatter: (cellContent, row) => (
            <>
                {row.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}
            </>
        ),
    },
    {
        dataField: 'startDate',
        sort: true,
        text: 'Start Date',
        formatter: (cellContent, row) => (
            <>{getFormattedDate(new Date(row.startDate))}</>
        ),
    },
    {
        dataField: 'endDate',
        sort: true,
        hidden: true,
        text: 'End Date',
        formatter: (cellContent, row) => (
            <>{getFormattedDate(new Date(row.endDate))}</>
        ),
    },
    {
        dataField: 'showInMenu',
        text: 'Show in Top Menu?',
        sort: true,
    },
    {
        dataField: 'dummy1',
        isDummyField: true,
        text: 'View Details',
        formatter: () => (
            <Button
                type="button"
                color="info"
                className="btn-sm btn-rounded"
                onClick={toggleViewModal}
            >
                View Details
            </Button>
        ),
    },
    {
        dataField: 'dummy2',
        isDummyField: true,
        text: 'Action',
        formatter: () => (
            <>
                <Button
                    type="button"
                    color="primary"
                    className="btn-sm btn-rounded"
                    onClick={toggleEditModal}
                >
                    Edit
                </Button>{' '}
                <Button
                    type="button"
                    color="danger"
                    className="btn-sm btn-rounded"
                    onClick={toggleDeleteModal}
                >
                    Delete
                </Button>
            </>
        ),
    },
]

export default BudgetsColumns
