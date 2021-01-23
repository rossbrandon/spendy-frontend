import PropTypes from 'prop-types'
import React from 'react'
import ReactApexChart from 'react-apexcharts'

const BarChart = props => {
    const { series, categories } = props
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

BarChart.propTypes = {
    series: PropTypes.array,
    categories: PropTypes.array,
}

export default BarChart
