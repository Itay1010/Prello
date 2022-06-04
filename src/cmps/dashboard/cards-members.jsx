import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { boardStatistics } from '../../services/board/board-statistics';


export function CardsMember({ cardsPerMember }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const labels = cardsPerMember.map(item => `${item.firstName} ${item.lastName}`)
    const dataToDisplay = cardsPerMember.map(item => item.tasksNum)
    const colors = cardsPerMember.map(item => boardStatistics.hexToRgb(item.color))


    const data = {
        labels,
        datasets: [
            {
                label: 'Tasks per member',
                data: dataToDisplay,
                borderColor: colors,
                backgroundColor: colors,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                color: 'rgb(2, 106, 167)',
                display: true,
                text: 'Cards by members',
                font: {
                    weight: 'light',
                    size: 30
                }
            }
        },
        maintainAspectRatio: false
    }

    return <Bar options={options} data={data} />

} 