// src/redux/hydroponicSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSensorDataOverTime } from "../api/sensorAPI";

export const fetchSensorData = createAsyncThunk("hydroponic/fetchSensorData", async () => {
  const response = await getSensorDataOverTime();
  return response;
});

const hydroponicSlice = createSlice({
  name: "hydroponic",
  initialState: {
    sensorData: [],
    status: "idle", // 'loading', 'succeeded', 'failed'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSensorData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSensorData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sensorData = action.payload;
      })
      .addCase(fetchSensorData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default hydroponicSlice.reducer;
