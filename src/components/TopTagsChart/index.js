import { useAggregateTags } from 'hooks'
import React from 'react'
import ReactApexChart from 'react-apexcharts'

const TopTagsChart = () => {
    const { aggregateTags } = useAggregateTags()

    aggregateTags.sort((a, b) => a.count > b.count)
    const categories = aggregateTags.map(p => p.tag)
    const series = [{}]
    series[0].data = aggregateTags.map(c => c.count)

    const options = {
        chart: {
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            theme: 'dark',
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: false,
        },

        colors: ['#f1b44c'],
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

export default TopTagsChart
