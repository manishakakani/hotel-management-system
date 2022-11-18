import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";

function ServiceRequested() {
  const handleServiceRequest = (event) => console.log(event.target.checked);
  return (
    <Grid container spacing={3} my={2}>
      <Grid item xs={12} align="center">
        <Typography variant="h3" color="primary">
          Service Requested
        </Typography>
      </Grid>
      {[1, 2, 3, 5, 6, 7, 8, 9, 3, 5, 7].map((a, index) => {
        return (
          <Grid item xs={12} md={6} lg={4} align="center" key={"sreq" + index}>
            <Card sx={{ maxWidth: 400 }}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">Room No. 201</Typography>
                <Box>
                  <Switch
                    onChange={($event) => handleServiceRequest($event)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  Completed
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ServiceRequested;
