import {
  AccountCircle,
  GitHub,
  LinkedIn,
  Save,
  Share,
} from "@mui/icons-material";
import {
  CardContent,
  Divider,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import ShareMenu from "./ShareMenu";
import AddToCollectionModal from "./AddToCollectionModal";
import { useSelector } from "react-redux";
import { BASE_URL } from "../config";

const backgroundStyle = {
  backgroundImage: `url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2264&q=80")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "max-content",
  flexWrap: "wrap",
  justifyContent: "center",
};

const UserCard = ({ data, selectedUser, setSelectedUser }) => {
  const matches = useMediaQuery("(min-width:1054px)");
  const [openShareModal, setopenShareModal] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);

  const shareHandler = (e) => {
    e.preventDefault();
    setopenShareModal(!openShareModal);
  };

  const saveProfileHandler = (e) => {
    e.preventDefault();
    setOpen(!open);
    setSelectedUser(data._id);
  };

  return (
    <>
      <Card sx={{ overflow: "visible!important", height: "100%" }}>
        <CardHeader
          sx={backgroundStyle}
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="user">
              {data.profile_image && data.profile_image !== "null" ? (
                <img
                  height="40px"
                  width="40px"
                  src={data.profile_image}
                  alt=""
                />
              ) : (
                `${data.first_name.slice(0, 1).toUpperCase()}${data.last_name
                  ?.slice(0, 1)
                  .toUpperCase()}`
              )}
            </Avatar>
          }
          action={
            <div style={{ display: "flex" }}>
              <IconButton aria-label="github">
                <a
                  style={{ color: "rgba(0,0,0,0.54)" }}
                  href={data.github_profile_link}
                  target="_blank"
                >
                  <GitHub />
                </a>
              </IconButton>
              <IconButton aria-label="LinkedIn">
                <a
                  style={{ color: "rgba(0,0,0,0.54)" }}
                  href={data.linkedin_profile_link}
                  target="_blank"
                >
                  <LinkedIn />
                </a>
              </IconButton>
            </div>
          }
          title={data.first_name + " " + data.last_name}
          subheader={
            <div style={{ minWidth: "148px" }}>
              <h5
                style={{
                  textTransform: "capitalize",
                  color: "rgba(0,0,0,0.8)",
                  fontSize: "14px",
                }}
              >
                {data.title}
              </h5>
              <h5
                style={{
                  textTransform: "capitalize",
                  color: "rgba(0,0,0,0.8)",
                  fontSize: "14px",
                }}
              >
                {data.city
                  ? `${data.city} ${data.state ? `, ${data.state}` : ""}`
                  : data.state
                  ? data.state
                  : ""}
              </h5>
            </div>
          }
        />
        <CardContent>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              paddingLeft: "16px",
              height: "65px",
              overflowY: "scroll",
            }}
          >
            <strong style={{ marginTop: matches ? "0" : "35px" }}>
              Skills:
            </strong>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
                marginTop: matches ? "0" : "35px",
              }}
            >
              {data.skills.map((skill, i) => {
                if (i < 2) {
                  return (
                    <span
                      key={i}
                      style={{
                        padding: "4px 8px",
                        borderRadius: "5px",
                        background: "#fff",
                        border: "1.5px solid rgba(23,124,226,.5)",
                        color: "rgba(23,124,226,.5)",
                        fontWeight: 600,
                      }}
                    >
                      {skill}
                    </span>
                  );
                }
                if (i == 3) {
                  return (
                    <span
                      key={i}
                      style={{
                        padding: "4px 8px",
                        borderRadius: "5px",
                        background: "#fff",
                        border: "1.5px solid rgba(23,124,226,.5)",
                        color: "rgba(23,124,226,.5)",
                        fontWeight: 600,
                      }}
                    >
                      +{data.skills.length - 3}
                    </span>
                  );
                }
              })}
            </Box>
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              padding: "10px 0 0 16px",
            }}
          >
            <Typography
              sx={{ height: "40px", overflowY: "scroll" }}
              variant="body2"
            >
              {data.description}
            </Typography>
          </div>
        </CardContent>
        <Divider />
        <CardActions
          sx={{
            padding: "10px 16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "space-between",
            }}
          >
            <Button
              size="small"
              variant="contained"
              onClick={shareHandler}
              sx={{
                borderRadius: "5px",
                background: "rgb(23 124 226/0.5)",
                color: "#000",
                fontSize: "14px",
                textTransform: "capitalize",
                padding: "4px 12px",
              }}
            >
              <Share style={{ paddingRight: "4px" }} />
              Share
            </Button>
            {openShareModal && (
              <ShareMenu shareUrl={`${BASE_URL}/profile/${data._id}`} />
            )}
            <Button
              size="small"
              variant="contained"
              sx={{
                borderRadius: "5px",
                background: "rgb(23 124 226/0.5)",
                color: "#000",
                fontSize: "14px",
                textTransform: "capitalize",
                padding: "4px 12px",
              }}
              onClick={saveProfileHandler}
            >
              <Save style={{ paddingRight: "4px" }} />
              Save
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              sx={{
                borderRadius: "5px",
                fontSize: "14px",
                textTransform: "capitalize",
                padding: "9px 10px",
                background: "rgb(23 124 226/0.5)",
                color: "#000",
              }}
            >
              <RouterLink
                style={{ color: "#000", lineHeight: "14px" }}
                to={`/profile/${data._id}`}
              >
                View Profile
              </RouterLink>
            </Button>
          </div>
        </CardActions>
      </Card>
      {selectedUser === data._id && (
        <AddToCollectionModal
          open={open}
          setOpen={setOpen}
          data={data}
          type={"developer"}
        />
      )}
    </>
  );
};

export default UserCard;
