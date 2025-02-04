import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SensorChart = () => {
  const chartData = {
    labels: ['10:00', '10:05', '10:10', '10:15', '10:20'], // Example timestamps
    datasets: [
      {
        label: 'pH Level',
        data: [7.1, 7.3, 7.0, 7.2, 7.1],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Water Level (%)',
        data: [80, 75, 70, 80, 85],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'EC Water Quality (mS/cm)',
        data: [1.5, 1.8, 1.7, 1.9, 2.0],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
      {
        label: 'Air Temperature (°C)',
        data: [24, 25, 26, 24, 23],
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
      },
      {
        label: 'Water Temperature (°C)',
        data: [21, 22, 22, 23, 21],
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sensor Data Over Time',
      },
    },
  };

  return (
    <Card style={{ backgroundColor: '#ffffff', borderRadius: 8, boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
      <CardContent>
        <Typography variant="h5" style={{ marginBottom: 10 }}>
          Sensor Data Chart
        </Typography>
        <Line data={chartData} options={options} />
      </CardContent>
    </Card>
  );
};

export default SensorChart;
