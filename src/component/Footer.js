import { GitHub, Instagram, LinkedIn, Mail } from "@mui/icons-material";
import { Box, Container, IconButton, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo1.png";

const devArr = [
  {
    developer: "Anushri Rawat",
    linkedin_url: "https://www.linkedin.com/in/anushri-rawat-a45195205/",
    github_url: "https://github.com/Anushri-Rawat",
    mail: "rawatanushri2002@gmail.com",
  },
  {
    developer: "Nikita Bhatnagar",
    linkedin_url: "https://www.linkedin.com/in/nikita-bhatnagar-bb87a1210/",
    github_url: "https://github.com/Nikita-Bhatnagar",
    mail: "",
  },
];

const BoxStyle = {
  display: "flex",
  gap: "0.5rem",
  justifyContent: "center",
  alignItems: "center",
};
const footerContainer = {
  textAlign: "center",
  display: "absolute",
  bottom: "0",
  left: "0",
  right: "0",
  borderTop: "1px solid #777",
  padding: "2rem 1.5rem",
};

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer style={{ background: "#f4fbff", marginTop: "20px" }}>
      <Container sx={footerContainer}>
        <Box>
          <img
            src={logo}
            alt="D4D"
            style={{ height: "80px", cursor: "pointer" }}
          />
          <Box sx={BoxStyle}>
            <IconButton>
              <GitHub />
            </IconButton>
            <IconButton>
              <LinkedIn />
            </IconButton>
          </Box>
          {/* <p>
            Created by &copy;{" "}
            <span style={{ fontWeight: "600" }}>Anushri Rawat</span> and{" "}
            <span style={{ fontWeight: "600" }}>Nikita Bhatnagar</span>
          </p> */}
          {/* {devArr.map((dev, i) => (
            <Box key={i} style={BoxStyle}>
              <span style={{ fontWeight: "600" }}>{dev.developer}:</span>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${dev.github_url}`);
                }}
              >
                <GitHub />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${dev.linkedin_url}`);
                }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton>
                <Mail />
              </IconButton>
            </Box>
          ))} */}
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
