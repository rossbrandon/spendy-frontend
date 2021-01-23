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

const ExpenseSearchTable = props => {
    const { allExpenses } = props
    const { t } = useTranslation()

    const rows = []
    allExpenses.map(expense => {
        const row = {}
        row.date = getYearMonthDayString(new Date(expense.date))
        row.place = expense.place
        row.price = expense.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })
        row.reason = expense.reason
        row.action = (
            <>
                <Link
                    to={{
                        pathname: `/expenses/${
                            expense.budget._id
                        }/${getFirstDayOfMonth(
                            new Date(expense.date),
                        )}/${getLastDayOfMonth(new Date(expense.date))}`,
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
            noRecordsFoundLabel={t('No expenses found yet!')}
            responsive
            noBottomColumns
            hover
        />
    )
}

ExpenseSearchTable.propTypes = {
    allExpenses: PropTypes.array,
}

export default ExpenseSearchTable
