import React from "react";
import {
  Box,
  Button,
  Typography,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import img from "../images/DrawKit Vector Illustration Project Manager (7).png";
import { Container } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const buttonStyles = {
  backgroundColor: "#4cacbc",
  borderRadius: "50px",
  fontSize: "12px",
  boxShadow: "none",
  padding: "6px 20px",
  fontWeight: "600",
};

const HeroSection = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ position: "relative", padding: matches ? "20px 16px" : "auto" }}>
      <div className="circles">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "100%", md: "50%" } }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "35px", sm: "35px", md: "42px" },
              fontWeight: "600",
              fontFamily: "Belleza",
              marginTop: { xs: 0, sm: "30px" },
            }}
          >
            D4D Hub(Developers for Developers)
          </Typography>
          <p>
            The only place to collab with coders,showcase your projects,show off
            your skills,save projects for future references and much more..
          </p>
          <Box style={{ display: "flex", gap: "1rem" }}>
            <RouterLink to="/search/projects">
              <Button
                variant="contained"
                sx={{ marginTop: "20px", ...buttonStyles }}
                className="btn"
              >
                Explore work
              </Button>
            </RouterLink>
            <RouterLink to="/search/profiles">
              <Button
                variant="contained"
                sx={{ marginTop: "20px", ...buttonStyles }}
                className="btn"
              >
                Find developers
              </Button>
            </RouterLink>
          </Box>
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "100%", md: "50%" } }}>
          {img ? (
            <img
              src={img}
              style={{ width: "100%", objectFit: "cover" }}
              alt="vectorimg"
            />
          ) : (
            <Skeleton variant="rectangular" width="100%" height="370px" />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
