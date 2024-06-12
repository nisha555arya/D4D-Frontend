import React, { useState, useEffect, useRef } from "react";
import { StepComponent, Spinner } from "../component";
import {
  Button,
  TextField,
  Grid,
  Container,
  Box,
  Avatar,
  Typography,
  MenuItem,
  Chip,
  Autocomplete,
} from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { TagsInput } from "react-tag-input-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile, updateSelfProfile } from "../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_DETAILS_UPDATE_RESET,
} from "../constants/userConstants";
import stateCountry from "state-country";
import { technologies } from "../utils/data";

const EditDetailsPage = ({ mode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    user,
    loading,
    success: userSuccess,
    error: userError,
  } = useSelector((state) => state.userDetails);

  const {
    user: updatedUser,
    success: userUpdateSuccess,
    error: userUpdateError,
  } = useSelector((state) => state.userUpdate);

  const [username, setUsername] = useState();
  const [title, setTitle] = useState();
  const [githubUrl, setGithubUrl] = useState();
  const [linkedinUrl, setLinkedinUrl] = useState();
  const [description, setDescription] = useState();
  const [tags, setTags] = useState([]);
  const [country, setCountry] = useState(user?.country || "");
  const [state, setState] = useState(user?.state || "");
  const [profile, setProfile] = useState({
    profileImg:
      user?.profile_image && user?.profile !== "null"
        ? user.profile_image
        : null,
    photoUrl:
      user?.profile_image && user?.profile !== "null"
        ? user.profile_image
        : null,
  });

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
    dispatch(getMyProfile(userInfo));
  }, [userInfo, navigate, dispatch]);

  useEffect(() => {
    if (!userSuccess && userError) {
      toast.error(userError);
    }
    if (userSuccess || userUpdateSuccess) {
      setUsername(user?.username);
      setDescription(user?.description);
      setTitle(user?.title);
      setGithubUrl(!user?.github_profile_link ? "" : user?.github_profile_link);
      setLinkedinUrl(
        !user?.linkedin_profile_link ? "" : user?.linkedin_profile_link
      );
      setCountry(user?.country || "");
      setState(user?.state || "");
      setTags(user?.skills || []);
    }
    if (userUpdateSuccess) {
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: USER_DETAILS_UPDATE_RESET });
      toast.success("successfully updated personal information");
      if (!id) {
        navigate("/edit/projects-gallery");
      } else {
        navigate(`/profile/${user._id}`);
      }
    }

    if (!userUpdateSuccess && userUpdateError) {
      toast.error(userUpdateError);
    }
  }, [
    dispatch,
    userUpdateSuccess,
    userUpdateError,
    userSuccess,
    userError,
    userSuccess,
  ]);

  const handleChange = (e) => {
    console.log(e.target.textContent);
    console.log(tags);
    setTags(e.target.textContent);
  };

  const uploadImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({
        ...profile,
        profileImg: file,
        photoUrl: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("profile_image", profile.profileImg);
    form.append("username", username);
    form.append("title", title);
    form.append("state", state);
    form.append("country", country);
    form.append("description", description);
    tags.map((tag) => form.append("skills", tag));
    form.append("linkedin_profile_link", linkedinUrl);
    form.append("github_profile_link", githubUrl);
    dispatch(updateSelfProfile(userInfo, form));
    dispatch({ type: USER_DETAILS_UPDATE_RESET });
  };

  return (
    <>
      <Container sx={{ minHeight: "75vh" }}>
        <Box sx={{ textAlign: "center", margin: "30px 0 0" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "600", fontSize: "2.25rem" }}
          >
            Lets get your profile ready!!
          </Typography>
          <Typography variant="p" style={{ opacity: "0.8", margin: "10px 0" }}>
            Remember, advertise best version of your work with clarity in
            vision. So that others find it easy to approach you. Vague words and
            numbers makes you unapproachable.
          </Typography>
        </Box>
        {!id && mode !== "edit" && <StepComponent />}
        {id && loading ? (
          <Spinner class={"loading-container"} />
        ) : (
          <Box sx={{ margin: "2rem 0" }}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="profilePhoto">
                    <Avatar
                      src={
                        profile.photoUrl
                          ? profile.photoUrl
                          : user?.profile_image
                      }
                      sx={{
                        width: "180px",
                        height: "180px",
                        cursor: "pointer",
                      }}
                    />
                    <input
                      accept="image/*"
                      id="profilePhoto"
                      type="file"
                      name="image"
                      onChange={uploadImageHandler}
                    />
                  </label>
                </Grid>
                <Grid item container spacing={3} xs={12} sm={8} md={9}>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      id="username"
                      label="Username"
                      type="text"
                      size="small"
                      fullWidth
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      id="fullname"
                      label="Full Name"
                      type="text"
                      size="small"
                      required
                      defaultValue={userInfo?.full_name}
                      disabled
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email"
                      type="email"
                      size="small"
                      defaultValue={userInfo?.email}
                      required
                      disabled
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      id="title"
                      label="Title"
                      type="text"
                      size="small"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      required
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      id="country"
                      select
                      label="Country"
                      value={country}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setCountry(e.target.value)}
                      fullWidth
                    >
                      {stateCountry.getAllCountries().map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      id="state"
                      select
                      label="State"
                      value={state}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setState(e.target.value)}
                      fullWidth
                    >
                      {stateCountry
                        .getAllStatesInCountry(country)
                        .map((option) => (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      id="githubLink"
                      label="Github Link"
                      type="text"
                      size="small"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      id="linkedinLink"
                      label="Linkedin Link"
                      size="small"
                      type="text"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>
                  <Grid item sm={12}>
                    {/* <TagsInput
                    multiple
                    maxWidth
                    options={technologies}
                    size="small"
                    id="tags"
                    placeHolder="My Skills"
                    maxTags={10}
                    value={tags}
                    onChange={handleChange}
                  /> */}
                    <Autocomplete
                      multiple
                      id="tags"
                      value={tags}
                      disableCloseOnSelect
                      onChange={(event: any, value: string[] | null) =>
                        setTags(value)
                      }
                      limitTags={10}
                      options={technologies}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Skills"
                          placeholder="Enter skills"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="description"
                      label="About Yourself(Max 300 words)"
                      type="text"
                      multiline
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>
                  <Grid item sx={{ paddingTop: "15px" }}>
                    <Button
                      type="submit"
                      sx={{
                        borderRadius: "4px",
                        fontWeight: "600",
                        backgroundColor: "#4cacbc",
                      }}
                      variant="contained"
                      startIcon={<SaveAltIcon />}
                      className="btn"
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>
        )}
      </Container>
    </>
  );
};
export default EditDetailsPage;
