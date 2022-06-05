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


export function ActsMembers({ actsByMember }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const labels = actsByMember.map(item => `${item.firstName} ${item.lastName}`)
    const dataToDisplay = actsByMember.map(item => item.count)
    const colors = actsByMember.map(item => boardStatistics.hexToRgb(item.color))


    const data = {
        labels,
        datasets: [
            {
                label: 'Total',
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
            }
        },
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            yAxis:
            {
                display: true,
            }
            ,
            xAxis: {
                display: true,
            }
        }
    }

    return <Bar options={options} data={data} />

} 