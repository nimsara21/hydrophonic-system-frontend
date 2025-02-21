import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig"; // Import Firebase configuration
import { Grid, Snackbar, Alert, Box, Card, CardContent, Typography } from "@mui/material";
import SensorChart from "./SensorChart";
import ControlPanel from "./ControlPanel";
import { Opacity, LightMode, Science, ElectricBolt, EvStation, WaterDrop } from "@mui/icons-material";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const sensorRef = ref(database, "sensorData"); // Path to your data

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        setSensorData(snapshot.val());
        setOpenSnackbar(true);
      } else {
        console.log("No data available");
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const sensorReadings = [
    { label: "Air Temperature", value: `${sensorData.airTemp} °C`, icon: <Science fontSize="large" />, color: "#4CAF50" },
    { label: "Distance", value: `${sensorData.distance} cm`, icon: <Opacity fontSize="large" />, color: "#1E88E5" },
    { label: "Humidity", value: `${sensorData.humidity} %`, icon: <WaterDrop fontSize="large" />, color: "#0288D1" },
    { label: "Liquid Temperature", value: `${sensorData.liquidTemp} °C`, icon: <LightMode fontSize="large" />, color: "#FFB300" },
    { label: "pH Level", value: `${sensorData.pH}`, icon: <EvStation fontSize="large" />, color: "#F4511E" },
    { label: "Total Dissolved Solids (TDS)", value: `${sensorData.tds} ppm`, icon: <ElectricBolt fontSize="large" />, color: "#FF4081" },
  ];

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8" }}>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Sensor data updated successfully!
        </Alert>
      </Snackbar>

      <Grid container spacing={3}>
        {/* Sensor Data Cards */}
        {sensorReadings.map((reading, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: reading.color,
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                textAlign: "center",
                color: "white",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                {reading.icon}
                <Typography variant="h6" sx={{ marginTop: 1 }}>
                  {reading.label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {reading.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Sensor Chart - Full Width on Top */}
        <Grid item xs={12}>
          <SensorChart />
        </Grid>

        {/* Control Panel */}
        <Grid item xs={12}>
          <ControlPanel />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
