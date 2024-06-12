import React, { useEffect } from "react";
import { HeroSection, ProjectCard, Spinner } from "./../component";
import { Grid, Box, Container } from "@mui/material";
import img1 from "../images/DrawKit Vector Illustration Project Manager (6).png";
import img2 from "../images/DrawKit Vector Illustration Project Manager (1).png";
import img3 from "../images/DrawKit Vector Illustration Project Manager (10).png";
import { useDispatch, useSelector } from "react-redux";
import {
  getMostLikedProjects,
  getMostViewedProjects,
} from "../actions/projectActions";

const HomePage = () => {
  const {
    success: likedProjectsSuccess,
    error: likedProjectsError,
    projects: likedProjects,
    loading: likedProjectsLoading,
  } = useSelector((state) => state.likedProjects);

  const {
    success: viewedProjectsSuccess,
    error: viewedProjectsError,
    projects: viewedProjects,
    loading: viewedProjectsLoading,
  } = useSelector((state) => state.viewedProjects);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMostLikedProjects());
    dispatch(getMostViewedProjects());
  }, [dispatch]);
  return (
    <>
      <HeroSection />
      <Container>
        <Box sx={{ flexGrow: 1, marginBottom: "30px" }}>
          <h5
            style={{
              textAlign: "center",
              fontSize: "35px",
              padding: "18px 0",
              fontWeight: 600,
            }}
          >
            Top Liked Projects
          </h5>
          <Grid
            container
            spacing={3}
            sx={{
              minHeight: "250px",
              justifyContent: "center",
            }}
          >
            {likedProjectsLoading && <Spinner class={"loading-container"} />}

            {!likedProjectsLoading &&
              likedProjectsSuccess &&
              likedProjects.map((elem, i) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={elem._id}>
                    <ProjectCard data={elem} />
                  </Grid>
                );
              })}
            {!likedProjectsLoading &&
              likedProjectsSuccess &&
              likedProjects.length === 0 && <p>No projects to display</p>}
            {!likedProjectsLoading && likedProjectsError && (
              <p>Something went wrong.</p>
            )}
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <h5
            style={{
              textAlign: "center",
              fontSize: "35px",
              padding: "18px 0",
              fontWeight: 600,
            }}
          >
            Top Viewed Projects
          </h5>
          <Grid
            container
            spacing={3}
            sx={{
              minHeight: "250px",
              justifyContent: "center",
            }}
          >
            {viewedProjectsLoading && <Spinner class={"loading-container"} />}
            {!viewedProjectsLoading &&
              viewedProjectsSuccess &&
              viewedProjects.map((elem) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={elem._id}>
                    <ProjectCard data={elem} />
                  </Grid>
                );
              })}
            {!viewedProjectsLoading &&
              viewedProjectsSuccess &&
              viewedProjects.length === 0 && <p>No projects to display</p>}
            {!viewedProjectsLoading && viewedProjectsError && (
              <p>Something went wrong.</p>
            )}
          </Grid>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", marginTop: "30px" }}
        >
          <h5
            style={{
              textAlign: "center",
              fontSize: "35px",
              padding: "18px 0",
              fontWeight: 600,
            }}
          >
            Features
          </h5>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "100%", md: "50%" } }}>
              <img
                src={img1}
                style={{ width: "100%", objectFit: "cover" }}
                alt="projects"
              />
            </Box>
            <Box sx={{ width: { xs: "100%", sm: "100%", md: "50%" } }}>
              <h2
                style={{
                  fontSize: "28px",
                  padding: "50px 0 10px",
                  fontWeight: 600,
                }}
              >
                #Top voted Projects
              </h2>
              <p>
                We welcome all stacks techies to join and showcase their work.
                The source code and videos attached to their projects provide
                others with a better understanding of the projects content.
              </p>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "100%", md: "50%" } }}>
              <h2
                style={{
                  fontSize: "28px",
                  padding: "60px 0 10px",
                  fontWeight: 600,
                }}
              >
                #Chat with other developers
              </h2>
              <p>
                We want our users to be able to communicate with coders through
                our platform. Embrace collaboration, connect with others, and
                code. A simple glance at your showcased projects will connect
                you directly with startups and top-notch companies.
              </p>
            </Box>
            <Box sx={{ width: { xs: "100%", sm: "100%", md: "50%" } }}>
              <img
                src={img2}
                style={{ width: "100%", objectFit: "cover" }}
                alt="chats"
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "100%", md: "50%" } }}>
              <img
                src={img3}
                style={{ width: "100%", objectFit: "cover" }}
                alt="portfolio"
              />
            </Box>
            <Box sx={{ width: { xs: "100%", sm: "100%", md: "50%" } }}>
              <h2
                style={{
                  fontSize: "28px",
                  padding: "60px 0 10px",
                  fontWeight: 600,
                }}
              >
                #Show it on portfolio
              </h2>
              <p>
                It will add to your portfolio.Having been part of many tech
                community is a sign of good geek.
              </p>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
