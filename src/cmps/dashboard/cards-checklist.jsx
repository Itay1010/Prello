import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export function CardsChecklist({ checklists }) {

    const DataToDisplay = [checklists.done, checklists.todos - checklists.done]

    const data = {
        labels: Object.keys(checklists),
        datasets: [
            {
                data: DataToDisplay,
                backgroundColor: ['#23C552', '#091e420a'],
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
            <Doughnut data={data} options={options} />
        </div>
    )
}