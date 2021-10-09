import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function ByGender(props) {

    const { male, female, others } = props.data;

    const data = {
        labels: ['Male', 'Female', 'Others'],
        datasets: [
            {
                label: '# of Gender',
                data: [male, female, others],
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

    return <Doughnut data={data} height={120} width={120}/>;
}

export default ByGender;