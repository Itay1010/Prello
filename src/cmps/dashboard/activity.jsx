import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'



export function Activity({ dataToDisplay, datesToDisplay }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    const labels = datesToDisplay

    const data = {
        labels,
        datasets: [
            {
                label: 'Tasks actions',
                data: dataToDisplay,
                borderColor: '#026AA7',
                backgroundColor: '#23C552',
                pointBorderWidth: 2

            }
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            }
        },
        maintainAspectRatio: false,
        scales: {
            yAxes: {

                gridLines: {
                    color: 'rgb(235, 90, 70)'
                },
                font: {
                    color: 'rgb(235, 90, 70)'
                }

            },
            xAxes: [
                {
                    gridLines: {
                        color: "blue"
                    }
                }
            ]
        }
    }


    return <Line options={options} data={data} />

} 