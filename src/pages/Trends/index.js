import AreaChart from 'components/AreaChart'
import Layout from 'components/Layout'
import { useAggregate, useBudgets } from 'hooks'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { getLastDayOfCurrentMonth, getPreviousYearFirstDayOfMonth } from 'utils'

/**
 * Build array of year-months (yyyy-mm) 1 year from today
 *
 * 1. Get today's date
 * 2. For all months in year (12, obviously)
 *  a. Set today's date to previous month
 *  b. Get the mm month number with zero prefix if applicable
 *  c. Get full yyyy
 *  d. Push yyyy-mm format to months array
 * 3. Reverse the array to go yyyy-01 to yyyy-12
 *
 * @returns array of yyyy-mm data for graph categories
 */
const getCategoryData = () => {
    const months = []
    const date = new Date()
    for (let i = 0; i < 12; i++) {
        date.setMonth(date.getMonth() - 1)
        const month = ('0' + (date.getMonth() + 1)).slice(-2)
        const year = date.getFullYear()
        months.push(`${year}-${month}`)
    }
    months.reverse()
    return months
}

/**
 * Build series data array for Apex charts in super complicated way
 *
 * 1. Loop through budets and aggregates
 *   a. Match budget name to aggregate budget id
 *   b. Push series object to series array with budget name and empty data array
 * 2. Loop through months array
 *   a. Get aggregate that matches budget id and month (matchedExact)
 *   b. Get aggregate that matches on budget it but not month (matchedPartial)
 *   c. Get series that matches budget name (s)
 *   d. If matchedExact exists: push aggregate total to series.data array for that month
 *   e. If matchedPartial exists: push 0 to series.data array for that month
 *   f. Else do nothing
 *
 * @param budgets   budget data from budgets context
 * @param aggregate budget aggregate data from aggregate context
 * @param months    yyyy-mm category data
 * @returns array of series objects for chart data
 */
const getSeriesData = (budgets, aggregate, months) => {
    const series = []
    budgets.map(b => {
        const seriesObject = {}
        aggregate.map(a => {
            if (a.budget === b._id) {
                seriesObject.name = b.name
                seriesObject.data = []
                if (!series.find(s => s.name === b.name)) {
                    series.push(seriesObject)
                }
            }
        })
        months.map(m => {
            const matchedExact = aggregate.find(
                a => a.budget === b._id && a.month === m,
            )
            const matchedPartial = aggregate.find(
                a => a.budget === b._id && a.month != m,
            )

            const s = series.find(s => s.name === b.name)
            if (matchedExact) {
                s.data.push(matchedExact.total.toFixed(0))
            } else if (matchedPartial) {
                s.data.push(0)
            }
        })
    })
    return series
}

const Trends = () => {
    const { t } = useTranslation()
    const { budgets } = useBudgets()
    const {
        aggregate,
        setAggregateStartDate,
        setAggregateEndDate,
    } = useAggregate()

    useEffect(() => {
        setAggregateStartDate(getPreviousYearFirstDayOfMonth(new Date()))
        setAggregateEndDate(getLastDayOfCurrentMonth())
    }, [])

    const months = getCategoryData(aggregate)
    const series = getSeriesData(budgets, aggregate, months)

    return (
        <Layout>
            <div className="page-content">
                <Container fluid>
                    <h4>{t('Trends')}</h4>
                    <Row>
                        <Col xl="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">
                                        {t('Spend History (Previous Year)')}
                                    </CardTitle>
                                    <AreaChart
                                        series={series}
                                        categories={months}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default Trends
