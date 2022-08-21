import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { boardStatistics } from '../../services/board/board-statistics'

ChartJS.register(ArcElement, Tooltip, Legend)

export function CardsLabels({ cardsPerLabels }) {
    const backgroundColor = Object.keys(cardsPerLabels).map(color => boardStatistics.hexToRgb(color))
    const data = {
        labels: Object.keys(cardsPerLabels),
        datasets: [
            {
                data: Object.values(cardsPerLabels),
                backgroundColor,
                // borderColor: backgroundColor,
                borderWidth: 0,
            },
        ],
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false
            }
        },
        maintainAspectRatio: false,
    }

    return (
        <div className="cards-chart ">
            <Pie data={data} options={options} />
        </div>
    )
}