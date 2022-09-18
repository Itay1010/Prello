import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip

} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { utilService } from '../../services/basic/util.service'


export function ActsMembers({ actsByMember }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Tooltip
    );

    const labels = actsByMember.map(item => item.member)
    const dataToDisplay = actsByMember.map(item => item.count)
    const colors = actsByMember.map(item => utilService.hexToRgb(item.color))


    const data = {
        labels,
        datasets: [
            {
                data: dataToDisplay,
                borderColor: colors,
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
        indexAxis: 'y',
        scales: {
            xAxis: {
                display: false,
            }
        }
    }

    return (
        <div className="members-chart">
            <Bar options={options} data={data} />
        </div>
    )
} 