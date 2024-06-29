"use client";

import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function CurrWorkoutRoutine() {
  return (
    <Box
      height={150}
      width="90%"
      display="flex"
      flexDirection="column"
      justifyContent="right"
      alignItems="center"
      marginLeft="5%"
      marginRight="5%"
      p={2}
      sx={{
        mt: 2,
        backgroundColor: "white",
        borderRadius: "8px", // Rounded corners
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Box shadow
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          textSize: 19,
          // mb: 2,
        }}
      >
        Workout Routine
        <Typography
          variant="body2"
          // component="div"
        >
          (Select Routine)
        </Typography>
      </Typography>

      <IconButton
        sx={{
          color: "#000",
          marginTop: "0px",
          marginBottom: "1px",
        }}
        onClick={() =>
          (window.location.href = "http://localhost:3000/workouts")
        }
      >
        <AddIcon
          sx={{
            color: "#000",
            marginTop: "0px",
            marginBottom: "1px",
          }}
          fontSize="large"
        />
      </IconButton>
    </Box>
  );
}
