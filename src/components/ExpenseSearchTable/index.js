import { useLocale } from 'hooks'
import { MDBDataTable } from 'mdbreact'
import { PropTypes } from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Badge } from 'reactstrap'
import {
    getFirstDayOfMonth,
    getLastDayOfMonth,
    getYearMonthDayString,
} from 'utils'

const getExpensePath = expense => {
    const expenseDate = new Date(expense.date)
    const utcDate = new Date(
        expenseDate.getTime() + expenseDate.getTimezoneOffset() * 60000,
    )
    const firstDayOfMonth = getFirstDayOfMonth(utcDate).toISOString()
    const lastDayOfMonth = getLastDayOfMonth(utcDate).toISOString()
    return `/expenses/${expense.budget._id}/${firstDayOfMonth}/${lastDayOfMonth}`
}

const ExpenseSearchTable = props => {
    const { allExpenses } = props
    const { t } = useTranslation()
    const { local, currency } = useLocale()

    const rows = []
    allExpenses.map(expense => {
        const row = {}
        row.date = getYearMonthDayString(new Date(expense.date))
        row.place = expense.place
        row.price = expense.price.toLocaleString(local, {
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
                <Link
                    to={{
                        pathname: getExpensePath(expense),
                    }}
                >
                    <Badge
                        className={'font-size-12 badge-soft-success'}
                        color="success"
                        pill
                    >
                        {expense.budget.name}
                    </Badge>
                </Link>
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
        <MDBDataTable
            data={data}
            searchLabel={t('Search')}
            paginationLabel={[t('Previous'), t('Next')]}
            infoLabel={[t('Showing'), t('to'), t('of'), t('entries')]}
            entries={25}
            entriesOptions={[10, 25, 50, 100]}
            entriesLabel={false}
            noRecordsFoundLabel={t('No expenses found')}
            noBottomColumns
            responsive
            hover
        />
    )
}

ExpenseSearchTable.propTypes = {
    allExpenses: PropTypes.array,
}

export default ExpenseSearchTable
