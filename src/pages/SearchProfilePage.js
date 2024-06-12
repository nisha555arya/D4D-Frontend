import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfiles } from "../actions/userActions";
import { UserCard, Spinner } from "../component";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Pagination from "@mui/material/Pagination";
import useMediaQuery from "@mui/material/useMediaQuery";
import { technologies } from "../utils/data";

const SearchProfilePage = (props) => {
  const [tech, setTech] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const matches = useMediaQuery("(min-width:600px)");
  const [page, setPage] = useState(1);
  const { loading, error, profiles } = useSelector(
    (state) => state.searchProfiles
  );

  const [profileList, setProfileList] = useState([]);
  const [total, setTotal] = useState(0);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfiles(tech, title, name, page));
  }, [page]);

  useEffect(() => {
    if (!loading && !error && profiles && Object.keys(profiles).length > 0) {
      setProfileList(profiles.profiles);
      setTotal(profiles.total);
    }
  }, [profiles]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(getProfiles(tech, title, name, 1));
    setPage(1);
  };

  const defaultPropsTech = {
    options: technologies,
    getOptionLabel: (option) => option,
  };

  return (
    <Container sx={{ marginTop: "35px" }}>
      <Typography variant="h3" align="center" component="h1">
        Explore the best of talent...
      </Typography>
      <Typography
        paragraph
        align="center"
        sx={{
          fontSize: "20px",
          margin: "30px auto 50px auto",
          maxWidth: "80%",
        }}
      >
        “Hard work beats talent when talent fails to work hard.” ― Kevin Durant
      </Typography>
      <form
        style={{
          boxShadow: "0px 0px 4px #ddd",
          padding: "20px 0px 20px 0",
          //marginLeft: "30px",
        }}
        onSubmit={submitHandler}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ padding: matches ? "0 10px 0 20px" : "0 10px 6px 10px" }}
          >
            <Autocomplete
              {...defaultPropsTech}
              id="tech"
              value={tech}
              onChange={(event, newValue) => {
                setTech(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Technologies" />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ padding: matches ? "0 10px 0 10px" : "6px 10px 6px 10px" }}
          >
            <TextField
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ padding: matches ? "0 20px 0 10px" : "6px 10px 0 10px" }}
          >
            <TextField
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container>
          <Button
            type="submit"
            variant="contained"
            className="searchBtn"
            sx={{
              width: "320px",
              margin: "20px auto 0 auto",
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "#4bacab",
            }}
          >
            <SearchIcon /> Search
          </Button>
        </Grid>
      </form>
      <Grid
        container
        sx={{
          margin: "20px",
          marginLeft: "0",
          alignItems: "center",
          minHeight: "40vh",
          justifyContent: "center",
        }}
      >
        {loading && <Spinner class={"loading-container"} />}
        {!loading &&
          !error &&
          profileList.map((elem) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                xl={3}
                sx={{ padding: "15px" }}
                key={elem._id}
              >
                <UserCard
                  data={elem}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </Grid>
            );
          })}
        {!loading && !error && profileList.length === 0 && (
          <Typography
            p
            sx={{
              margin: "initial auto",
              fontSize: "20px",
            }}
          >
            No developers found!
          </Typography>
        )}
        {!loading && error && (
          <Typography
            p
            sx={{
              margin: "initial auto",
              fontSize: "20px",
            }}
          >
            Something went wrong. Try again.
          </Typography>
        )}
      </Grid>
      <Grid container sx={{ justifyContent: "center", alignItems: "center" }}>
        {total > 0 && (
          <Pagination
            sx={{ margin: "20px" }}
            onChange={handlePageChange}
            page={page}
            count={Math.ceil(total / 12)}
          />
        )}
      </Grid>
    </Container>
  );
};
export default SearchProfilePage;
