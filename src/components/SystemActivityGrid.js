import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

const SystemActivityGrid = () => {
  const [systemActivity, setSystemActivity] = useState({});

  useEffect(() => {
    const activityRef = ref(database, "systemActivity");
    
    const unsubscribe = onValue(activityRef, (snapshot) => {
      if (snapshot.exists()) {
        setSystemActivity(snapshot.val());
      } else {
        console.log("No system activity data available");
      }
    });

    return () => unsubscribe();
  }, []);

  const activityList = Object.entries(systemActivity);

  return (
    <Box sx={{ mt: 3, width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        System Activity
      </Typography>
      <Grid container spacing={2}>
        {activityList.map(([key, value]) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
                backgroundColor: value ? "#E0F7FA" : "#FFEBEE",
                borderRadius: 3,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                sx={{ fontSize: "1.2rem", fontWeight: 500, textTransform: "capitalize" }}
              >
                {key}
              </Typography>
              {value ? (
                <CheckCircle sx={{ color: "#00796B", fontSize: "2rem" }} />
              ) : (
                <Cancel sx={{ color: "#D32F2F", fontSize: "2rem" }} />
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SystemActivityGrid;
