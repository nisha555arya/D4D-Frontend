import React, { useState } from "react";
import {
  Container,
  Button,
  Box,
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import {
  AccountCircle,
  Logout,
  Edit,
  Bookmarks,
  QuestionAnswer,
} from "@mui/icons-material";
import logo from "../images/logo1.png";
import { useTheme } from "@mui/material/styles";

const buttonStyles = {
  backgroundColor: "#4cacbc",
  borderRadius: "50px",
  fontSize: "12px",
  boxShadow: "none",
  padding: "6px 20px",
  fontWeight: "600",
};

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const user = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <header>
      <AppBar position="static" sx={{ background: "white" }}>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img
            src={logo}
            alt="D4D"
            style={{ height: "50px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <ul style={{ display: matches ? "none" : "flex" }}>
            <li style={{ marginRight: "20px" }}>
              <RouterLink to="search/projects" className="navlinks">
                Explore Work
              </RouterLink>
            </li>
            <li>
              <RouterLink to="search/profiles" className="navlinks">
                Find Developers
              </RouterLink>
            </li>
          </ul>
          <Box>
            {userInfo ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar src={user?.profile_image} />
                    {/* <Avatar sx={{ bg: "red" }} alt="profile photo">
                      {user?.profile_image && user.profile_image !== "null" ? (
                        <img
                          height="100%"
                          width="100%"
                          style={{ objectFit: "cover" }}
                          src={user?.profile_image}
                          alt=""
                        />
                      ) : (
                        `${user?.first_name?.[0].toUpperCase()}${user?.last_name?.[0].toUpperCase()}`
                      )}
                    </Avatar> */}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem sx={{ display: "flex", gap: "0.5rem" }}>
                    <Avatar src={user?.profile_image} alt="profile photo" />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {userInfo.full_name}
                      </Typography>
                      <Typography variant="p" sx={{ color: "#777" }}>
                        @{user?.username}
                      </Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate(`/profile/${userInfo._id}`);
                    }}
                  >
                    <AccountCircle />
                    <Typography textAlign="center" sx={{ marginLeft: "5px" }}>
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate(`/edit/basic-details/${user._id}`);
                    }}
                  >
                    <Edit />
                    <Typography textAlign="center" sx={{ marginLeft: "5px" }}>
                      Edit Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/collections");
                    }}
                  >
                    <Bookmarks />
                    <Typography textAlign="center" sx={{ marginLeft: "5px" }}>
                      Collections
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/chat");
                    }}
                  >
                    <QuestionAnswer />
                    <Typography textAlign="center" sx={{ marginLeft: "5px" }}>
                      Messages
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/");
                      dispatch(logout());
                    }}
                  >
                    <Logout />
                    <Typography textAlign="center" sx={{ marginLeft: "3px" }}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <RouterLink to="/signin" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{ ...buttonStyles }}
                  className="btn"
                >
                  Signin
                </Button>
              </RouterLink>
            )}
          </Box>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
