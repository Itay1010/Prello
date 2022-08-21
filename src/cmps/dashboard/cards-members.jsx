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


export function CardsMember({ cardsPerMember, unAssignedTasks }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const labels = cardsPerMember.map(item => `${item.firstName} ${item.lastName}`)
    labels.push('Unassigned tasks')
    const dataToDisplay = cardsPerMember.map(item => item.tasksNum)
    dataToDisplay.push(unAssignedTasks)
    const colors = cardsPerMember.map(item => boardStatistics.hexToRgb(item.color))
    colors.push('#9F9F9F')


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
        scales: {
            yAxis:
            {
                display: true,

            }
            ,
            xAxis: {
                display: false,
            }
        }
    }

    return (
        <div className="members-chart ">
            <Bar options={options} data={data} />
        </div>
    )

} 