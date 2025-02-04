import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { getSensorDataOverTime } from "../api/sensorAPI"; // API function to get sensor data over time

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SensorChart = () => {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const data = await getSensorDataOverTime();
        setSensorData(data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    // Initial fetch of sensor data
    fetchSensorData();

    // Set up polling to fetch data every 5 seconds
    const interval = setInterval(() => {
      fetchSensorData();
    }, 5000); // Adjust the interval time as needed (5 seconds here)

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (!sensorData) {
    return <div>Loading sensor data...</div>;
  }

  const chartData = {
    labels: sensorData.map((entry) => new Date(entry.createdAt).toLocaleString()),
    datasets: [
      {
        label: "pH Level",
        data: sensorData.map((entry) => entry.pH),
        borderColor: "#4CAF50",
        backgroundColor: "#4CAF50",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Water Level",
        data: sensorData.map((entry) => entry.waterLevel),
        borderColor: "#1E88E5",
        backgroundColor: "#1E88E5",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Humidity",
        data: sensorData.map((entry) => entry.humidity),
        borderColor: "#0288D1",
        backgroundColor: "#0288D1",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Temperature",
        data: sensorData.map((entry) => entry.temperature),
        borderColor: "#FFB300",
        backgroundColor: "#FFB300",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Water Temp",
        data: sensorData.map((entry) => entry.waterTemp),
        borderColor: "#F4511E",
        backgroundColor: "#F4511E",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Grow Light Cycle",
        data: sensorData.map((entry) => entry.growLightCycle),
        borderColor: "#FF4081",
        backgroundColor: "#FF4081",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default SensorChart;
