import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Switch, Box } from "@mui/material";
import { Opacity, LightMode, Science, ElectricBolt, EvStation, WaterDrop } from "@mui/icons-material";

const ControlPanel = () => {
  const [controlState, setControlState] = useState({
    waterMotor: false,
    phMotorUp: false,
    phMotorDown: false,
    growLight: false,
    fertilizer: false,
    solenoid: false,
  });

  const toggleControl = (key) => {
    setControlState({ ...controlState, [key]: !controlState[key] });
    console.log(`Toggled ${key}: ${!controlState[key]}`);
  };

  const controlItems = [
    { key: "waterMotor", label: "Water Motor", icon: <EvStation fontSize="large" />, color: "#1E88E5" },
    { key: "phMotorUp", label: "pH Up", icon: <Science fontSize="large" />, color: "#4CAF50" },
    { key: "phMotorDown", label: "pH Down", icon: <Science fontSize="large" />, color: "#F4511E" },
    { key: "growLight", label: "Grow Light", icon: <LightMode fontSize="large" />, color: "#FFB300" },
    { key: "fertilizer", label: "Fertilizer", icon: <ElectricBolt fontSize="large" />, color: "#FF4081" },
    { key: "solenoid", label: "Solenoid", icon: <WaterDrop fontSize="large" />, color: "#0288D1" },
  ];

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        System Controls
      </Typography>
      <Grid container spacing={3}>
        {controlItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.key}>
            <Card
              sx={{
                backgroundColor: item.color,
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                textAlign: "center",
                color: "white",
              }}
            >
              <CardContent>
                {item.icon}
                <Typography variant="h6">{item.label}</Typography>
                <Switch
                  checked={controlState[item.key]}
                  onChange={() => toggleControl(item.key)}
                  color="default"
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "white",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "white",
                    },
                  }}
                />
                {/* ON/OFF Text Indicator */}
                <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 1 }}>
                  {controlState[item.key] ? "ON" : "OFF"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ControlPanel;
