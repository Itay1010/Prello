import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { boardStatistics } from '../../services/board/board-statistics';
// import faker from 'faker';

export function Activity({ dataToDisplay, datesToDisplay }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true
    }

    const labels = datesToDisplay

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: dataToDisplay,
                borderColor: '#026AA7',
                backgroundColor: '#026ba786',
            }
        ],
    };
    return <Line options={options} data={data} />

} 