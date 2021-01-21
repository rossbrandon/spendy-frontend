import React, { useEffect } from 'react'
import { Container, Row, Col, Card, CardTitle, CardBody } from 'reactstrap'
import Layout from 'components/Layout'
import { useTranslation } from 'react-i18next'
import AreaChart from 'components/AreaChart'
import { useAggregate, useBudgets } from 'hooks'
import { getPreviousYearFirstDayOfMonth, getLastDayOfCurrentMonth } from 'utils'

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

    // build array of month numbers 1 year from today
    const months = []
    const date = new Date()
    for (let i = 0; i < 12; i++) {
        date.setMonth(date.getMonth() - 1)
        const month = date.getMonth()
        months.push(month)
    }
    months.reverse()
    aggregate.sort((a, b) => (a.month > b.month ? 1 : -1))

    // match budget name to aggregate.budget id
    // add series data for each month - 0 if month is missing
    // push object to series array
    let series = []
    budgets.map(b => {
        const seriesObject = {}
        aggregate.map(a => {
            if (a.budget === b._id) {
                //a.name = b.name
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

    console.log(series)

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
                                        {t('History')}
                                    </CardTitle>
                                    <AreaChart series={series} />
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
