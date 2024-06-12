import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Stack,
  Paper,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Tab,
  Grid,
  Link,
  useMediaQuery,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import bg from "../images/background-wallpaper-with-polygons-in-gradient-colors-vector.jpg";
import {
  EditRounded,
  PersonRounded,
  Share,
  Edit,
  Add,
  Science,
  Chat,
  GitHub,
  LinkedIn,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/system";
import { ProjectCard, Spinner } from "../component";
import { getProfileById } from "../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProjectList } from "../actions/projectActions";
import {
  PROJECT_LIST_SUCCESS,
  PROJECT_DELETE_RESET,
} from "../constants/projectConstants";
import ShareMenu from "../component/ShareMenu";
import {
  createConversation,
  getAllConversations,
} from "../actions/chatActions";
import { CONVERSATION_CREATE_RESET } from "../constants/chatConstants";
import { BASE_URL } from "../config";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "2px",
}));

const ProfilePage = () => {
  const [value, setValue] = useState("1");
  const [openShareModal, setOpenShareModal] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(770));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loading,
    profileInfo,
    error: profileInfoError,
  } = useSelector((state) => state.userProfile);
  const { userInfo } = useSelector((state) => state.userLogin);

  const { projects, loading: projectLoading } = useSelector(
    (state) => state.projectList
  );

  const { success: deleteSuccess, id: deletedId } = useSelector(
    (state) => state.projectDelete
  );

  const shareHandler = (e) => {
    e.preventDefault();
    setOpenShareModal(!openShareModal);
  };

  const nestedSort =
    (prop1, prop2 = null, direction = "asc") =>
    (e1, e2) => {
      const a = prop2 ? e1[prop1][prop2] : e1[prop1],
        b = prop2 ? e2[prop1][prop2] : e2[prop1],
        sortOrder = direction === "asc" ? 1 : -1;
      return a < b ? -sortOrder : a > b ? sortOrder : 0;
    };
  let mostLikedProjects =
    projects?.sort(nestedSort("likesCount", null, "desc")) || [];

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
    dispatch(getProjectList(id, userInfo));
    dispatch(getProfileById(id));
    // if (profileInfo && !profileInfo.username) {
    //   toast.error("profile with this id does not exist");
    //   navigate("/");
    // }
  }, [id, userInfo]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch({
        type: PROJECT_LIST_SUCCESS,
        payload: projects.filter((p) => p._id !== deletedId),
      });
      toast.success("project deleted successfully!");
      dispatch({ type: PROJECT_DELETE_RESET });
    }
  }, [deleteSuccess, deletedId]);

  useEffect(() => {
    if (profileInfo && !profileInfo.username) {
      toast.error("profile with this id does not exist");
      navigate("/");
    }

    dispatch(getProfileById(id));
  }, [id]);

  useEffect(() => {
    dispatch({ type: CONVERSATION_CREATE_RESET });
  }, []);
  const {
    loading: convLoading,
    error: convError,
    conversations,
  } = useSelector((state) => state.conversationList);

  const {
    loading: curConvLoading,
    error: curConvError,
    curConversation,
  } = useSelector((state) => state.conversationCreate);
  const reqChatHandler = (e) => {
    dispatch(createConversation(profileInfo._id, userInfo));
    dispatch(getAllConversations(userInfo));
  };

  useEffect(() => {
    if (curConversation) navigate(`/chat/${curConversation._id}`);
  }, [curConversation]);

  return (
    <Container
      sx={{
        padding: { xs: "0", sm: "30px" },
        height: "100%",
        overflow: "hidden!important",
      }}
    >
      {loading && <Spinner class={"loading-container"} />}
      {!loading && !profileInfoError && (
        <Stack
          direction="row"
          sx={{
            flexDirection: matches ? "column" : "row",
            gap: matches ? 0 : "1.5rem",
          }}
        >
          <Item
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: matches ? "100%" : "32%",
              textAlign: "left",
              color: "#000",
              padding: 0,
              minHeight: matches ? "50vh" : "85vh",
              height: "max-content",
            }}
          >
            <Box as="div" sx={{ position: "relative" }}>
              <img src={bg} alt="background" height={100} width={"100%"} />
              <Avatar
                alt="profile-picture"
                sx={{
                  width: "100px",
                  height: "100px",
                  position: "absolute",
                  bottom: "-40px",
                  left: "10px",
                  border: "2px solid #fff",
                  bgcolor: "red",
                }}
                aria-label="user"
              >
                {profileInfo?.profile_image &&
                profileInfo?.profile_image !== "null" ? (
                  <img
                    height="100%"
                    width="100%"
                    src={profileInfo?.profile_image}
                    alt=""
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  `${profileInfo?.first_name
                    .slice(0, 1)
                    .toUpperCase()}${profileInfo?.last_name
                    ?.slice(0, 1)
                    .toUpperCase()}`
                )}
              </Avatar>
            </Box>
            <Box
              sx={{
                marginTop: "52px",
                padding: "0 15px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {profileInfo?.full_name}
              </Typography>
              <Typography variant="p">@{profileInfo?.username}</Typography>
              <Typography variant="p" sx={{ color: "#777" }}>
                {profileInfo?.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontSize: "1.15rem", marginTop: "10px", fontWeight: 600 }}
              >
                My skills are
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {profileInfo?.skills.map((skill, i) => (
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
                ))}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.15rem",
                  marginTop: "10px",
                  fontWeight: 600,
                }}
              >
                Contact
              </Typography>
              <div>
                <IconButton sx={{ padding: "0 6px" }}>
                  <Link
                    href={profileInfo?.github_profile_link}
                    style={{ color: "#777" }}
                  >
                    <GitHub />
                  </Link>
                </IconButton>
                <IconButton sx={{ padding: "0 6px" }}>
                  <Link
                    href={profileInfo?.linkedin_profile_link}
                    style={{ color: "#777" }}
                  >
                    <LinkedIn />
                  </Link>
                </IconButton>
              </div>
              {userInfo?._id === profileInfo?._id ? (
                <Button
                  variant="outlined"
                  startIcon={<EditRounded />}
                  sx={{ margin: "10px 0 10px" }}
                  onClick={() =>
                    navigate(`/edit/basic-details/${profileInfo?.id}`)
                  }
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<Chat />}
                  sx={{ margin: "20px 0 10px" }}
                  onClick={reqChatHandler}
                >
                  Request Chat
                </Button>
              )}
              <Button
                variant="contained"
                startIcon={<Share />}
                sx={{
                  borderRadius: "2px",
                  background: "#4cacbc ",
                  marginBottom: "15px",
                  position: "relative",
                }}
                onClick={shareHandler}
              >
                Share
                {openShareModal && (
                  <ShareMenu
                    shareUrl={`${BASE_URL}/profile/${profileInfo._id}`}
                  />
                )}
              </Button>
            </Box>
          </Item>
          <Item
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: matches ? "100%" : "68%",
              textAlign: "left",
              color: "#000",
              padding: 0,
              marginLeft: { xs: 0 },
            }}
          >
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <TabList onChange={handleChange}>
                  <Tab
                    icon={<PersonRounded />}
                    label="Profile"
                    value="1"
                    sx={{ display: "flex", flexDirection: "row" }}
                  />
                  <Tab
                    label="Projects"
                    icon={<Science />}
                    value="2"
                    sx={{ display: "flex", flexDirection: "row" }}
                  />
                </TabList>
              </Box>

              <TabPanel
                value="1"
                sx={{
                  padding: "24px 0",
                }}
              >
                <Box
                  sx={{
                    padding: "5px",
                    maxHeight: "100vh",
                    overflowY: "scroll",
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      padding: "10px 16px",
                      border: "1px solid rgb(226 232 239)",
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: "space-between",
                        marginBottom: "5px",
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{ fontSize: "1.25rem", fontWeight: 600 }}
                      >
                        About me
                      </Typography>
                      {userInfo?._id === profileInfo?._id && (
                        <IconButton
                          sx={{ padding: 0, color: "#000" }}
                          onClick={() =>
                            navigate(`/edit/basic-details/${profileInfo?._id}`)
                          }
                        >
                          <Edit />
                        </IconButton>
                      )}
                    </Stack>
                    <Typography variant="p">
                      {profileInfo?.description}
                    </Typography>
                  </Paper>
                  <Paper
                    elevation={0}
                    sx={{
                      padding: "10px 16px",
                      margin: "15px 0",
                      border: "1px solid rgb(226 232 239)",
                    }}
                  >
                    <Typography
                      variant="p"
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                      }}
                    >
                      Top Liked Projects
                    </Typography>
                    <Grid
                      container
                      spacing={3}
                      sx={{
                        minHeight: "250px",
                        marginTop: "6px",
                      }}
                    >
                      {projectLoading && (
                        <Spinner class={"loading-container"} />
                      )}

                      {!projectLoading &&
                        mostLikedProjects?.map((elem, i) => {
                          if (i < 4) {
                            return (
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={4}
                                key={elem._id}
                              >
                                <ProjectCard data={elem} />
                              </Grid>
                            );
                          }
                        })}
                      {!projectLoading && mostLikedProjects?.length === 0 && (
                        <p style={{ padding: "0 1.5rem" }}>
                          No projects to display
                        </p>
                      )}
                    </Grid>
                  </Paper>
                </Box>
              </TabPanel>
              <TabPanel value="2" sx={{ padding: "24px 0" }}>
                <Paper
                  elevation={0}
                  sx={{
                    padding: "15px",
                    border: "1px solid rgb(226 232 239)",
                    maxHeight: "100vh",
                    overflowY: "scroll",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      All Projects
                    </Typography>
                    {userInfo?._id === profileInfo?._id && (
                      <IconButton
                        onClick={() => {
                          navigate("/edit/projects-gallery");
                        }}
                      >
                        <Add sx={{ color: "#000" }} />
                      </IconButton>
                    )}
                  </Box>
                  <Grid container spacing={2}>
                    {!projectLoading &&
                      projects?.map((project) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          lg={4}
                          key={project._id}
                        >
                          <ProjectCard data={project} />
                        </Grid>
                      ))}
                    {!projects?.length && <Grid item>No project posted!!</Grid>}
                  </Grid>
                </Paper>
              </TabPanel>
            </TabContext>
          </Item>
        </Stack>
      )}
      {!loading && profileInfoError && (
        <Typography
          p
          sx={{
            margin: "initial auto",
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          Something went wrong. Try again.
        </Typography>
      )}
    </Container>
  );
};

export default ProfilePage;
