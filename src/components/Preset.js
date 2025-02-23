import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  TextField,
  CardContent
} from '@mui/material';
import { database } from '../firebaseConfig'; // Adjust the path based on your folder structure
import { ref, set } from 'firebase/database'; // Import necessary functions

const Preset = () => {
  const [presets, setPresets] = useState({
    pH: 6.0,
    tdsMin: 600,
    tdsMax: 1000,
    pumpStartTime: '08', // Store only hour
    pumpEndTime: '18',   // Store only hour
    pumpOnDuration: 15,
    pumpOffDuration: 45,
    lightStartTime: '06', // Store only hour
    lightEndTime: '20'    // Store only hour
  });

  const [open, setOpen] = useState(false);
  const [tempPresets, setTempPresets] = useState({ ...presets });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    setPresets(tempPresets);
    
    // Save data to Firebase
    try {
      const presetRef = ref(database, 'presets/'); // Adjust the path as needed
      await set(presetRef, {
        pH: parseFloat(tempPresets.pH), // Convert to number
        tdsMin: parseInt(tempPresets.tdsMin, 10), // Convert to number
        tdsMax: parseInt(tempPresets.tdsMax, 10), // Convert to number
        pumpStartTime: parseInt(tempPresets.pumpStartTime, 10), // Store hour only
        pumpEndTime: parseInt(tempPresets.pumpEndTime, 10), // Store hour only
        pumpOnDuration: parseInt(tempPresets.pumpOnDuration, 10), // Convert to number
        pumpOffDuration: parseInt(tempPresets.pumpOffDuration, 10), // Convert to number
        lightStartTime: parseInt(tempPresets.lightStartTime, 10), // Store hour only
        lightEndTime: parseInt(tempPresets.lightEndTime, 10), // Store hour only
      });
      console.log("Presets saved successfully!");
    } catch (error) {
      console.error("Error saving presets:", error);
    }

    handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.includes('pump') || name.includes('light')) {
      // Extract hour from time string and store as integer
      const hour = value.split(':')[0]; // Get the hour part
      setTempPresets({
        ...tempPresets,
        [name]: hour // Store only hour as a number
      });
    } else {
      setTempPresets({
        ...tempPresets,
        [name]: name.includes('pump') ? parseInt(value) : value
      });
    }
  };

  return (
    <CardContent sx={{ 
      height: '100%',
      padding: '20px !important',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#2C3930',
      color: 'white',
      borderRadius: 3,
      gap: 2
    }}>
      <Typography 
        variant="h6" 
        sx={{ 
          fontSize: '1.1rem',
          textAlign: 'center',
          fontWeight: 'bold',
          borderBottom: '2px solid rgba(255,255,255,0.2)',
          pb: 1.5,
          mb: 1
        }}
      >
        System Presets
      </Typography>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        gap: 1,
        '& .MuiTypography-root': {
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '10px 14px',
          borderRadius: 1.5,
          fontSize: '0.9rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }
      }}>
        <Typography variant="body2">
          pH Level: <strong>{presets.pH}</strong>
        </Typography>
        <Typography variant="body2">
          TDS Range: <strong>{presets.tdsMin} - {presets.tdsMax} ppm</strong>
        </Typography>
        <Typography variant="body2">
          Pump active Hours: <strong>{presets.pumpStartTime} - {presets.pumpEndTime}</strong>
        </Typography>
        <Typography variant="body2">
          Pump On/Off period: <strong>{presets.pumpOnDuration} / {presets.pumpOffDuration} min</strong>
        </Typography> 
        <Typography variant="body2">
          Grow light active Hours: <strong>{presets.lightStartTime} - {presets.lightEndTime}</strong>
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        mt: 'auto',
        pt: 0,
        pb: 1,
      }}>
        <Button 
          variant="contained" 
          onClick={handleOpen}
          sx={{ 
            fontSize: '0.9rem',
            py: 1,
            px: 2,
            minWidth: '160px',
            marginBottom: 5,
            backgroundColor: '#A27B5C',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            '&:hover': {
              backgroundColor: '#DCD7C9',
              color: '#A27B5C',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
            },
            transition: 'all 0.2s ease-in-out'
          }}
          size="large"
        >
          Modify Presets
        </Button>
      </Box>

      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: '320px'
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Modify System Presets</DialogTitle>
        <DialogContent>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1.5, 
            pt: 1.5 
          }}>
            <TextField
              name="pH"
              label="pH Level"
              type="number"
              value={tempPresets.pH}
              onChange={handleChange}
              inputProps={{ step: 0.1 }}
            />
            <TextField
              name="tdsMin"
              label="Minimum TDS (ppm)"
              type="number"
              value={tempPresets.tdsMin}
              onChange={handleChange}
              inputProps={{ min: 0 }}
              fullWidth
            />
            <TextField
              name="tdsMax"
              label="Maximum TDS (ppm)"
              type="number"
              value={tempPresets.tdsMax}
              onChange={handleChange}
              inputProps={{ min: tempPresets.tdsMin }}  // Can't be less than min
              fullWidth
              error={tempPresets.tdsMax <= tempPresets.tdsMin}
              helperText={tempPresets.tdsMax <= tempPresets.tdsMin ? "Max TDS must be greater than Min TDS" : ""}
            />
            <TextField
              name="pumpStartTime"
              label="Pump Start Time"
              type="time"
              value={tempPresets.pumpStartTime + ":00"} // Append seconds for time input
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="pumpEndTime"
              label="Pump End Time"
              type="time"
              value={tempPresets.pumpEndTime + ":00"} // Append seconds for time input
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="pumpOnDuration"
              label="Pump On Duration (minutes)"
              type="number"
              value={tempPresets.pumpOnDuration}
              onChange={handleChange}
              inputProps={{ min: 1 }}
            />
            <TextField
              name="pumpOffDuration"
              label="Pump Off Duration (minutes)"
              type="number"
              value={tempPresets.pumpOffDuration}
              onChange={handleChange}
              inputProps={{ min: 1 }}
            />
            <TextField
              name="lightStartTime"
              label="Light Start Time"
              type="time"
              value={tempPresets.lightStartTime + ":00"} // Append seconds for time input
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="lightEndTime"
              label="Light End Time"
              type="time"
              value={tempPresets.lightEndTime + ":00"} // Append seconds for time input
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </CardContent>
  );
};

export default Preset;
