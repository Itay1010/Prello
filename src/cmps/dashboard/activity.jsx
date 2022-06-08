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
    Filler
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
        Legend,
        Filler
    )

    const labels = datesToDisplay

    function createGradient() {

    }

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: dataToDisplay,
                borderColor: '#026AA7',
                backgroundColor: '#23C552',
                // pointBorderWidth: 1,
                fill: {
                    target: 'origin',
                    above: '#026ba721',
                }
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
            yAxes: [{

                gridLines: {
                    color: 'rgb(235, 90, 70)'
                },

            }],
            xAxes: [
                {
                    gridLines: {
                        color: 'blue'
                    }
                }
            ]
        },


        elements: {
            line: {
                tension: 0,
            },
            point: {
                radius: 5,
                hoverRadius: 7,
            }
        },
    }


    return <Line options={options} data={data} />

} 