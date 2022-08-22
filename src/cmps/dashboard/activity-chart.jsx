import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'


export function ActivityChart({ dataToDisplay, datesToDisplay }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Filler
    )

    const labels = datesToDisplay

    const data = {
        labels,
        datasets: [
            {
                data: dataToDisplay,
                borderColor: '#026AA7',
                backgroundColor: '#23C552',
                fill: {
                    target: 'origin',
                    above: '#026ba721',
                }
            }
        ],
    }

    const options = {
        animation: {
            delay: 400,
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            }
        },
        maintainAspectRatio: false,
        // scales: {
        //     yAxes: {
        //         grid: {
        //             borderColor: '#172b4d'
        //         },
        //     },
        //     xAxes: {
        //         grid: {
        //             borderColor: '#172b4d'
        //         },
        //     },
        // },
        elements: {
            line: {
                tension: 0,
            },
            point: {
                radius: 5,
                hoverRadius: 7,
            }
        }
    }


    return (
        <div className="activity-chart">
            <Line options={options} data={data} />
        </div>
    )

} 