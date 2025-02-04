import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch sensor data
export const fetchSensorData = createAsyncThunk('hydroponic/fetchSensorData', async () => {
  const response = await axios.get('https://your-backend-url.com/api/sensor-data'); // Update with your actual backend URL
  return response.data;
});

const hydroponicSlice = createSlice({
  name: 'hydroponic',
  initialState: {
    sensorData: {
      pH: 7.0,
      waterLevel: 80,
      humidity: 60,
    },
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSensorData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSensorData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sensorData = action.payload;
      })
      .addCase(fetchSensorData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default hydroponicSlice.reducer;
