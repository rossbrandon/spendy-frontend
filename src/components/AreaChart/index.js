import { useAggregate, useBudgets } from 'hooks'
import React, { useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
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
 * 1. Loop through budgets and aggregateSums
 *   a. Match budget name to aggregateSum budget id
 *   b. Push series object to series array with budget name and empty data array
 * 2. Loop through months array
 *   a. Get aggregateSum that matches budget id and month (matchedExact)
 *   b. Get aggregateSum that matches on budget it but not month (matchedPartial)
 *   c. Get series that matches budget name (s)
 *   d. If matchedExact exists: push aggregateSum total to series.data array for that month
 *   e. If matchedPartial exists: push 0 to series.data array for that month
 *   f. Else do nothing
 *
 * @param budgets   budget data from budgets context
 * @param aggregateSum budget aggregateSum data from aggregateSum context
 * @param months    yyyy-mm category data
 * @returns array of series objects for chart data
 */
const getSeriesData = (budgets, aggregateSum, months) => {
    const series = []
    budgets.map(b => {
        const seriesObject = {}
        aggregateSum.map(a => {
            if (a.budget === b._id) {
                seriesObject.name = b.name
                seriesObject.data = []
                if (!series.find(s => s.name === b.name)) {
                    series.push(seriesObject)
                }
            }
        })
        months.map(m => {
            const matchedExact = aggregateSum.find(
                a => a.budget === b._id && a.month === m,
            )
            const matchedPartial = aggregateSum.find(
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

const AreaChart = () => {
    const { budgets } = useBudgets()
    const {
        aggregateSum,
        setAggregateStartDate,
        setAggregateEndDate,
    } = useAggregate()

    useEffect(() => {
        setAggregateStartDate(getPreviousYearFirstDayOfMonth(new Date()))
        setAggregateEndDate(getLastDayOfCurrentMonth())
    }, [])

    const categories = getCategoryData(aggregateSum)
    const series = getSeriesData(budgets, aggregateSum, categories)

    const options = {
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100, 100, 100],
            },
        },
        xaxis: {
            categories,
        },

        markers: {
            size: 3,
            strokeWidth: 3,

            hover: {
                size: 4,
                sizeOffset: 2,
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
        },
    }

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="area"
            height="380"
        />
    )
}

export default AreaChart
