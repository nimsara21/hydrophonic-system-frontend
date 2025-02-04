import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CircularProgress, Card, CardContent, Typography, Paper, Box, Button, Snackbar, Alert } from '@mui/material';
import { fetchSensorData } from '../redux/hydroponicSlice';
import SensorChart from './SensorChart';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { sensorData, status } = useSelector((state) => state.hydroponic);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchSensorData());
    const interval = setInterval(() => {
      dispatch(fetchSensorData());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      setOpenSnackbar(true);
    }
  }, [status]);

  const handleRefresh = () => {
    dispatch(fetchSensorData());
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box style={{ padding: 20, backgroundColor: '#f4f6f8' }}>
      {/* Snackbar for Success Notification */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Sensor data updated successfully!
        </Alert>
      </Snackbar>

      <Grid container spacing={4}>
        {/* Sensor Data Card */}
        <Grid item xs={12} md={6}>
          <Card style={{ backgroundColor: '#ffffff', borderRadius: 8, boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Typography variant="h5" style={{ marginBottom: 10 }}>
                Current Sensor Readings
            </Typography>
            <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
                <Typography variant="h6">pH Level: {sensorData.pH}</Typography>
                <Typography variant="h6">Water Level: {sensorData.waterLevel} %</Typography>
                <Typography variant="h6">Humidity: {sensorData.humidity} %</Typography>
                <Typography variant="h6">Grow Light Cycle: {sensorData.growLightCycle}</Typography>
                <Typography variant="h6">EC Water Quality: {sensorData.ecWaterQuality} mS/cm</Typography>
                <Typography variant="h6">Air Temperature: {sensorData.temperature} °C</Typography>
                <Typography variant="h6">Water Temperature: {sensorData.waterTemperature} °C</Typography>
                <Typography variant="h6">Water Pump Cycle: {sensorData.waterPumpCycle}</Typography>
            </Paper>
            <Button variant="contained" color="primary" onClick={handleRefresh}>
                Refresh Data
            </Button>
            </CardContent>

          </Card>
        </Grid>

        {/* Sensor Chart */}
        <Grid item xs={12} md={6}>
          <SensorChart />
        </Grid>

        {/* Real-time Updates Info */}
        <Grid item xs={12} md={12}>
          {status === 'loading' ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={300}>
              <CircularProgress />
            </Box>
          ) : (
            <Paper elevation={3} style={{ padding: 20 }}>
              <Typography variant="h6">Real-time Sensor Updates</Typography>
              <Typography variant="body2">The dashboard is updated every 5 seconds.</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
