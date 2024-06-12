import React from "react";
import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Done } from "@mui/icons-material";

const StepComponent = ({ step1, step2 }) => {
  return (
    <Box sx={{ textAlign: "center", margin: "15px 0 20px" }}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <RouterLink to="/edit/basic-details">
          {!step1 ? (
            <Box
              sx={{
                width: "2rem",
                height: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "#fff",
                border: "1.5px solid #1976d2",
                color: "#1976d2",
                fontWeight: 600,
              }}
            >
              1
            </Box>
          ) : (
            <Box
              sx={{
                width: "2rem",
                height: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "#1976d2",
              }}
            >
              <Done sx={{ color: "#fff" }} />
            </Box>
          )}
        </RouterLink>
        <div
          className="line"
          style={{
            height: "1.5px",
            width: "40px",
            backgroundColor: "#1976d2",
            float: "left",
            margin: "14px 0px",
            padding: 0,
          }}
        ></div>
        <RouterLink to="/edit/projects-gallery">
          {!step2 ? (
            <Box
              sx={{
                width: "2rem",
                height: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "#fff",
                border: "1.5px solid #1976d2",
                color: "#1976d2",
                fontWeight: 600,
              }}
            >
              2
            </Box>
          ) : (
            <Box
              sx={{
                width: "2rem",
                height: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "#1976d2",
              }}
            >
              <Done />
            </Box>
          )}
        </RouterLink>
      </Box>
    </Box>
  );
};

export default StepComponent;
