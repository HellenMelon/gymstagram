import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

export default function DailyChallenges() {
  return (
    <div>
      <div className="p-10"></div>
      <Box
        className="h-[25%] rounded-md"
        width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="right"
        alignItems="center"
        marginLeft="5%"
        marginRight="5%"
        p={2}
        sx={{
          mt: 0,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Box shadow
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginTop: 0,
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 1.5,
            fontSize: 20,
          }}
        >
          🔥 Daily Challenges 🔥
        </Typography>

        <Divider sx={{ width: "100%" }} />

        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{
            marginBottom: 0.5,
          }}
        >
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#bbdf8c",
              },
              color: "#bbdf8c",
            }}
          />
          <Typography
            variant="body1"
            sx={{
              marginTop: 1,
              marginBottom: 1,
            }}
          >
            Do 10 push ups!
          </Typography>
        </Box>

        <Divider sx={{ width: "100%" }} />

        <Button
          variant="contained"
          sx={{
            mt: "12px",
            mb: "0px",
            width: "85%",
            backgroundColor: "#e2f7c6", // Button background color
            color: "#000", // Button text color
            ":hover": {
              backgroundColor: "#e2f7c6", // Button hover color
            },
          }}
          disableElevation
          component="a"
          href="http://localhost:3000/post"
        >
          Post your daily challenge!
        </Button>
      </Box>
    </div>
  );
}
