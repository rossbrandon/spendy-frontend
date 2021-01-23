import { useAggregate } from 'hooks'
import React from 'react'
import ReactApexChart from 'react-apexcharts'

const BarChart = () => {
    const { aggregatePlaces } = useAggregate()

    aggregatePlaces.sort((a, b) => a.count > b.count)
    const categories = aggregatePlaces.map(p => p.place)
    const series = [{}]
    series[0].data = aggregatePlaces.map(c => c.count)

    const options = {
        chart: {
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: false,
        },

        colors: ['#34c38f'],
        grid: {
            borderColor: '#f1f1f1',
        },
        xaxis: {
            categories,
        },
    }

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height="350"
        />
    )
}

export default BarChart
