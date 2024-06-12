import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "../actions/projectActions";
import { ProjectCard, Spinner } from "../component";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import Pagination from "@mui/material/Pagination";
import { Pages } from "@mui/icons-material";
import { technologies, keywords } from "../utils/data";

const SearchProjectPage = (props) => {
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [tech, setTech] = useState("");
  const [keyword, setKeyword] = useState("");

  const matches = useMediaQuery("(min-width:1200px)");
  const matchesSm = useMediaQuery("(min-width:600px)");
  const { loading, error, projects } = useSelector(
    (state) => state.searchProjects
  );
  const [projectList, setProjectList] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects(tech, keyword, page));
  }, [page]);

  useEffect(() => {
    if (!loading && !error && projects && Object.keys(projects).length > 0) {
      setProjectList(projects.projects);
      setTotal(projects.total);
    }
  }, [projects]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(getProjects(tech, keyword, 1));
    setPage(1);
  };

  const defaultPropsTech = {
    options: technologies,
    getOptionLabel: (option) => option,
  };

  const defaultPropsKeywords = {
    options: keywords,
    getOptionLabel: (option) => option,
  };

  return (
    <Container sx={{ marginTop: "35px" }}>
      <Typography variant="h3" align="center" component="h1">
        Consider. Shape. Influence. Shine.
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
        Perfection is achieved not when there is nothing more to add, but rather
        when there is nothing more to take away.” – Antoine de Saint-Exupery
      </Typography>
      <form
        style={{
          boxShadow: "0px 0px 4px #ddd",
          padding: matchesSm ? "20px 20px 20px 0" : "20px",
          marginLeft: matches ? "30px" : "0",
        }}
        onSubmit={submitHandler}
      >
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ padding: matchesSm ? "0 10px 0 20px" : "0 0 6px 0" }}
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
            sm={6}
            sx={{ padding: matchesSm ? "0 10px 0 20px" : "6px 0 0 0" }}
          >
            <Autocomplete
              {...defaultPropsKeywords}
              id="keywords"
              value={keyword}
              onChange={(event, newValue) => {
                setKeyword(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Keywords" />
              )}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="searchBtn"
            sx={{
              width: "370px",
              margin: "20px auto 0 auto",
              padding: "10px 0",
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
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
          marginLeft: matches ? "20px" : "0px",
        }}
      >
        {loading && <Spinner class={"loading-container"} />}
        {!loading &&
          !error &&
          projectList.map((elem) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{ padding: "15px" }}
                key={elem._id}
              >
                <ProjectCard data={elem} />
              </Grid>
            );
          })}
        {!loading && !error && projectList.length === 0 && (
          <Typography
            p
            sx={{
              margin: "initial auto",
              fontSize: "20px",
            }}
          >
            No projects found!
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
export default SearchProjectPage;
