import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function ByVaccine(props) {

    const { covishield, covaxin, sputnik } = props.data;

    const data = {
        labels: ['Covishield', 'Covaxin', 'Sputnik'],
        datasets: [
            {
                label: '# of Vaccine',
                data: [covishield, covaxin, sputnik],
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

export default ByVaccine;