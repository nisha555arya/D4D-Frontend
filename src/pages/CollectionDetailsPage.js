import { Container, Grid, Typography, Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCollection } from "../actions/collectionAction";
import { ProjectCard, UserCard, Spinner } from "../component";
import { COLLECTION_DETAILS_RESET } from "../constants/collectionConstants";

const CollectionDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { collection, loading, error } = useSelector(
    (state) => state.collectionDetails
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    if (error) {
      toast.error(error);
      dispatch({ type: COLLECTION_DETAILS_RESET });
    }
    dispatch(getCollection(id));
  }, [id, error, userInfo]);

  return loading ? (
    <Spinner class={"loading-container"} />
  ) : (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "700",
            padding: "15px 0 20px",
          }}
        >
          {collection?.name}
        </Typography>
        {collection.type === "project" ? (
          <Grid container spacing={3}>
            {collection?.project_id?.length > 0
              ? collection?.project_id?.map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                    <ProjectCard data={item} />
                  </Grid>
                ))
              : "No item in the collection"}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {collection?.developer_id?.length > 0
              ? collection?.developer_id?.map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                    <UserCard data={item} />
                  </Grid>
                ))
              : "No item in the collection"}
          </Grid>
        )}
      </div>
    </Container>
  );
};

export default CollectionDetailsPage;
