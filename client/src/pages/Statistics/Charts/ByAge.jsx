import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function ByAge(props) {

    const { vac_18_45, vac_45_60, above_60 } = props.data;

    const data = {
        labels: ['18-44', '45-60', 'Above 60'],
        datasets: [
            {
                label: '# of Age',
                data: [vac_18_45, vac_45_60, above_60],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={data} />;
}

export default ByAge;