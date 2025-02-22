import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig";
import { Snackbar, Alert, Box, Card, CardContent, Typography, Stack } from "@mui/material";
import SensorChart from "./SensorChart";
import ControlPanel from "./ControlPanel";
import { Opacity, LightMode, Science, ElectricBolt, EvStation, WaterDrop } from "@mui/icons-material";
import Preset from './Preset';

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
    { label: "Air Temperature", value: `${sensorData.airTemp} °C`, icon: <Science fontSize="medium" />, color: "#FFB300" },
    { label: "Water Level", value: `${sensorData.distance} cm`, icon: <Opacity fontSize="medium" />, color: "#00bcd4" },
    { label: "Humidity", value: `${sensorData.humidity} %`, icon: <WaterDrop fontSize="medium" />, color: "#0288D1" },
    { label: "Liquid Temperature", value: `${sensorData.liquidTemp} °C`, icon: <LightMode fontSize="medium" />, color: "#c6ff00" },
    { label: "pH Level", value: `${sensorData.pH}`, icon: <EvStation fontSize="medium" />, color: "#4CAF50" },
    { label: "Total Dissolved Solids (TDS)", value: `${sensorData.tds} ppm`, icon: <ElectricBolt fontSize="medium" />, color: "#FF4081" },
  ];

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8" }}>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Sensor data updated successfully!
        </Alert>
      </Snackbar>

      <Stack spacing={3}>
        {/* Main Content Container */}
        <Box sx={{ 
          display: 'flex', 
          gap: 3,  // This creates 23px gap (MUI's spacing unit * 3)
          alignItems: 'stretch'
        }}>
          {/* Sensor Cards Container */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 3,
            flex: '1 1 auto',
            maxWidth: 'calc(100% - 350px)' // Adjusted for better preset width
          }}>
            {sensorReadings.map((reading, index) => (
              <Box 
                key={index}
                sx={{
                  flexGrow: 1,
                  flexBasis: 'calc(33.333% - 24px)',
                  maxWidth: 'calc(33.333% - 24px)',
                  minWidth: '250px' // Increased for better readability
                }}
              >
                <Card
                  sx={{
                    height: '180px',  // Keep this height for each card
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: reading.color,
                    borderRadius: 3,
                    boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
                    textAlign: "center",
                    color: "white",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": { transform: "scale(1.02)" }, // Reduced scale for subtlety
                  }}
                >
                  <CardContent sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    padding: '24px !important'
                  }}>
                    <Box>
                      {React.cloneElement(reading.icon, { 
                        fontSize: "large",
                        sx: { fontSize: '2rem' } // Increased icon size
                      })}
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontSize: '1.2rem',
                          marginTop: 2,
                          fontWeight: 500
                        }}
                      >
                        {reading.label}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: "bold",
                        fontSize: '1.6rem',
                        marginBottom: 0.5
                      }}
                    >
                      {reading.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          {/* Preset Component */}
          <Box sx={{ 
            width: '330px',
            flexShrink: 0,
            height: '383px',  // Adjusted to match sensor cards (180px * 2 + gap 23px)
          }}>
            <Card sx={{ 
              height: '100%',
              boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
              borderRadius: 3
            }}>
              <Preset />
            </Card>
          </Box>
        </Box>

        {/* Sensor Chart */}
        <Box sx={{ mt: 3 }}>
          <SensorChart />
        </Box>

        {/* Control Panel */}
        <Box sx={{ mt: 3 }}>
          <ControlPanel />
        </Box>
      </Stack>
    </Box>
  );
};

export default Dashboard;
