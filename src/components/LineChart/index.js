import PropTypes from 'prop-types'
import React from 'react'
import ReactApexChart from 'react-apexcharts'

const LineChart = props => {
    const { series, categories } = props

    const options = {
        chart: { zoom: { enabled: !1 }, toolbar: { show: !1 } },
        dataLabels: { enabled: !1 },
        stroke: {
            width: [3, 4, 3],
            curve: 'straight',
            dashArray: [2, 2, 2, 2, 2],
        },
        markers: { size: 0, hover: { sizeOffset: 6 } },
        xaxis: {
            categories,
        },
        grid: { borderColor: '#f1f1f1' },
    }

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="line"
            height="380"
        />
    )
}

LineChart.propTypes = {
    series: PropTypes.array,
    categories: PropTypes.array,
}

export default LineChart
