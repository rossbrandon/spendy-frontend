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
const ExpensesColumns = (
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
        dataField: 'date',
        sort: true,
        text: 'Date',
        formatter: (cellContent, row) => (
            <>{getFormattedDate(new Date(row.date))}</>
        ),
    },
    {
        dataField: 'place',
        text: 'Place',
        sort: true,
    },
    {
        dataField: 'price',
        text: 'Price',
        sort: true,
        formatter: (cellContent, row) => (
            <>
                {row.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}
            </>
        ),
    },
    {
        dataField: 'reason',
        text: 'Reason',
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

export default ExpensesColumns
