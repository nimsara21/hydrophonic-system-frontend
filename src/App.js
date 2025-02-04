import React from 'react';
import { Box, Typography } from '@mui/material';
import Dashboard from './components/Dashboard'; // Assuming you have a Dashboard component

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',  // Ensures the layout takes full screen height
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: '#3f51b5',
          color: 'white',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4">Hydroponic System Dashboard</Typography>
      </Box>

      {/* Main Content Section */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,  // Makes this section take the remaining space
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <Dashboard />  {/* Your dashboard component here */}
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          backgroundColor: '#3f51b5',
          color: 'white',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1">&copy; 2025 Hydroponic System</Typography>
      </Box>
    </Box>
  );
}

export default App;
