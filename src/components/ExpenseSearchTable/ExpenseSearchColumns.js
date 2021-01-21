import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from 'reactstrap'
import { getFirstDayOfMonth, getLastDayOfMonth } from 'utils'

const getFormattedDate = date => {
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    utcDate.setDate(utcDate.getDate())
    const dayIndex = utcDate.getDay()
    const dayName = days[dayIndex]
    const monthName = utcDate.toLocaleString('default', { month: 'long' })
    const year = utcDate.getFullYear()
    return `${dayName}, ${monthName} ${utcDate.getDate()}, ${year}`
}

const ExpenseSearchColumns = (startDate, endDate) => [
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
        dataField: 'budget',
        text: 'Budget',
        sort: true,
        formatter: (cellContent, row) => (
            <>
                <Link
                    to={{
                        pathname: `/expenses/${
                            row.budget._id
                        }/${getFirstDayOfMonth(
                            new Date(row.date),
                        )}/${getLastDayOfMonth(new Date(row.date))}`,
                    }}
                >
                    <Badge
                        className={'font-size-12 badge-soft-success'}
                        color="success"
                        pill
                    >
                        {row.budget.name}
                    </Badge>
                </Link>
            </>
        ),
    },
]

export default ExpenseSearchColumns
