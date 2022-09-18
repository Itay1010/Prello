import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { utilService } from '../../services/basic/util.service';


export function CardsMember({ cardsPerMember, unAssignedTasks }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Tooltip
    );

    const labels = cardsPerMember.map(item => item.member)
    labels.push('Unassigned tasks')
    const dataToDisplay = cardsPerMember.map(item => item.tasksCount)
    dataToDisplay.push(unAssignedTasks)
    const colors = cardsPerMember.map(item => utilService.hexToRgb(item.color))
    colors.push('#9F9F9F')


    const data = {
        labels,
        datasets: [
            {
                data: dataToDisplay,
                backgroundColor: colors,
            }
        ]
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