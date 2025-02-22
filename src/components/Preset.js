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

const Preset = () => {
  const [presets, setPresets] = useState({
    pH: 6.0,
    tds: 800,
    pumpStartTime: '08:00',
    pumpEndTime: '18:00',
    pumpOnDuration: 15,
    pumpOffDuration: 45,
    lightStartTime: '06:00',  // Added light cycle start
    lightEndTime: '20:00'     // Added light cycle end
  });

  const [open, setOpen] = useState(false);
  const [tempPresets, setTempPresets] = useState({...presets});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    setPresets(tempPresets);
    handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTempPresets({
      ...tempPresets,
      [name]: name.includes('pump') && !name.includes('Time') ? parseInt(value) : value
    });
  };

  return (
    <CardContent sx={{ 
      height: '100%',
      padding: '20px !important',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#1a237e',
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
          TDS (ppm): <strong>{presets.tds}</strong>
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
            marginBottom:5,
            backgroundColor: '#4caf50', // Green color for better visibility
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            '&:hover': {
              backgroundColor: '#45a049',
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
              name="tds"
              label="TDS (ppm)"
              type="number"
              value={tempPresets.tds}
              onChange={handleChange}
            />
            <TextField
              name="pumpStartTime"
              label="Pump Start Time"
              type="time"
              value={tempPresets.pumpStartTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="pumpEndTime"
              label="Pump End Time"
              type="time"
              value={tempPresets.pumpEndTime}
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
              value={tempPresets.lightStartTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="lightEndTime"
              label="Light End Time"
              type="time"
              value={tempPresets.lightEndTime}
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