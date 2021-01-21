import React from 'react'
import PropTypes from 'prop-types'
import ReactApexChart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'

const AreaChart = props => {
    const { series } = props
    const { t } = useTranslation()

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
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
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

AreaChart.propTypes = {
    series: PropTypes.array,
}

export default AreaChart
