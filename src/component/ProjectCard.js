import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Avatar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Typography,
  CardContent,
  Divider,
} from "@mui/material";
import {
  FavoriteBorder,
  Share,
  MoreVert,
  TextsmsRounded,
  Visibility,
  Delete,
  Edit,
  Favorite,
  SettingsCellOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { deleteProject, updateLikesOfProject } from "../actions/projectActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import ShareMenu from "./ShareMenu";
import ReactPlayer from "react-player/youtube";

const ProjectCard = ({ data }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openShareModal, setOpenShareModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width:900px)");
  const handleOpenProjectMenu = (event) => {
    event.preventDefault();
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseProjectMenu = () => {
    setAnchorElUser(null);
  };
  const { userInfo } = useSelector((state) => state.userLogin);
  const user = data.user ? data.user[0] : data.user_id;

  const [likeVal, setLikeVal] = useState(
    data?.likes?.find((key) => key === userInfo?._id)
  );
  const [count, setCount] = useState(data?.likes?.length);

  const likeHandler = (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate("/signin");
    } else {
      setLikeVal(!likeVal);
      !likeVal ? setCount(count + 1) : setCount(count - 1);
      dispatch(updateLikesOfProject(userInfo, data?._id));
    }
  };

  const shareHandler = (e) => {
    e.preventDefault();
    setOpenShareModal(!openShareModal);
  };

  return (
    <Card sx={{ maxWidth: matches ? "300px" : "100%", height: "100%" }}>
      <Link to={`/project/${data.name.split(" ").join("-")}/${data._id}`}>
        <CardHeader
          sx={{ padding: "12px", color: "#000" }}
          avatar={
            <Avatar aria-label="profile-image" sx={{ bgcolor: "red" }}>
              {user?.profile_image && user?.profile_image !== "null" ? (
                <img
                  height="100%"
                  width="100%"
                  src={user?.profile_image}
                  alt=""
                />
              ) : (
                `${user?.first_name?.[0].toUpperCase()}${user?.last_name?.[0].toUpperCase()}`
              )}
            </Avatar>
          }
          action={
            userInfo?._id && data.user_id._id === userInfo?._id ? (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton
                  aria-label="settings"
                  onClick={handleOpenProjectMenu}
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  sx={{ mt: "30px" }}
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
                  onClose={handleCloseProjectMenu}
                >
                  <MenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      handleCloseProjectMenu();
                      navigate(`/edit/projects-gallery/${data._id}`);
                    }}
                  >
                    <Edit />
                    <Typography textAlign="center">Edit</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      handleCloseProjectMenu();
                      dispatch(deleteProject(userInfo, data._id));
                    }}
                  >
                    <Delete />
                    <Typography textAlign="center">Delete</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              ""
            )
          }
          title={data.name.slice(0, 16)}
          subheader={"@" + user.username}
        />
        <CardMedia sx={{ height: "134px" }}>
          {data.video_url &&
            (data.video_url.includes("youtube") ? (
              <ReactPlayer
                url={data.video_url}
                width="100%"
                height="114"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <video
                controls
                width="100%"
                height="134"
                style={{ objectFit: "cover" }}
              >
                <source src={data.video_url} type="video/mp4" />
              </video>
            ))}
          {!data.video_url && (
            <img
              src={data.images_url[0]}
              style={{ height: "134px", width: "100%", objectFit: "cover" }}
              alt=""
            />
          )}
        </CardMedia>
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 3px",
            position: "relative",
          }}
        >
          <div>
            <IconButton
              aria-label="add to favorites"
              sx={{ fontSize: "18px" }}
              onClick={likeHandler}
            >
              {likeVal ? (
                <Favorite sx={{ color: "red", fontSize: "18px" }} />
              ) : (
                <FavoriteBorder sx={{ color: "red", fontSize: "18px" }} />
              )}
              <span style={{ paddingLeft: "2px" }}>{count}</span>
            </IconButton>
            <IconButton aria-label="message" sx={{ fontSize: "18px" }}>
              <TextsmsRounded sx={{ fontSize: "18px" }} />{" "}
              <span style={{ paddingLeft: "2px" }}>
                {data?.comments.length}
              </span>
            </IconButton>
            <IconButton aria-label="visibility" sx={{ fontSize: "18px" }}>
              <Visibility sx={{ fontSize: "18px" }} />{" "}
              <span style={{ paddingLeft: "2px" }}>
                {data.viewsCount ? data.viewsCount : 0}
              </span>
            </IconButton>
          </div>
          <div>
            <IconButton
              aria-label="share"
              sx={{ fontSize: "18px" }}
              onClick={shareHandler}
            >
              <Share sx={{ fontSize: "18px" }} />
            </IconButton>
          </div>
          {openShareModal && <ShareMenu shareUrl={data.deployed_link} />}
        </CardActions>
        <Divider />
        <CardContent
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            margin: "5px 0 10px",
            padding: "0 10px",
          }}
        >
          {data.required_skills.map((skill, i) => {
            if (i < 3) {
              return (
                <span
                  key={i}
                  style={{
                    padding: "3px 6px",
                    borderRadius: "5px",
                    background: "#fff",
                    border: "1.5px solid #777",
                    color: "#777",
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
                    padding: "3px 6px",
                    borderRadius: "5px",
                    background: "#fff",
                    border: "1.5px solid #777",
                    color: "#777",
                    fontWeight: 600,
                  }}
                >
                  +{data.required_skills.length - 3}
                </span>
              );
            }
          })}
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProjectCard;
