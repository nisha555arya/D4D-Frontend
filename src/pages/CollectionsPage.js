import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCollections } from "../actions/collectionAction";
import { CollectionCard, Spinner } from "../component";
import { Grid, Container, Typography, Box, Tab } from "@mui/material";
import { toast } from "react-toastify";
import {
  COLLECTION_DELETE_RESET,
  COLLECTION_LIST_SUCCESS,
} from "../constants/collectionConstants";
import { useNavigate } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Science, Person } from "@mui/icons-material";

const CollectionsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState("1");

  const { collections, loading, error } = useSelector(
    (state) => state.collectionList
  );
  const {
    success: deleteSuccess,
    id: deletedId,
    error: deleteError,
  } = useSelector((state) => state.collectionDelete);
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }

    dispatch(getAllCollections());
  }, [userInfo]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch({
        type: COLLECTION_LIST_SUCCESS,
        payload: collections.filter((c) => c.id !== deletedId),
      });
      toast.success("Collection deleted successfully");
      dispatch({ type: COLLECTION_DELETE_RESET });
    }
    if (!deleteSuccess && deleteError) {
      toast.error(deleteError);
    }
  }, [deleteSuccess, deleteError, deletedId]);

  return (
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
            padding: "15px 0 20px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Your Collections
        </Typography>
        {loading && <Spinner class={"loading-container"} />}
        {collections.length === 0 && <p>No Collection made yet!!</p>}
        {!loading && !error && (
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <TabList onChange={handleChange}>
                <Tab
                  label="Projects"
                  icon={<Science />}
                  value="1"
                  sx={{ display: "flex", flexDirection: "row" }}
                />
                <Tab
                  label="Developers"
                  icon={<Person />}
                  value="2"
                  sx={{ display: "flex", flexDirection: "row" }}
                />
              </TabList>
            </Box>

            <TabPanel
              value="1"
              sx={{
                padding: "24px 0",
                width: "100%!important",
              }}
            >
              <Grid container spacing={3}>
                {collections?.map((collection) => {
                  if (collection.type === "project") {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={collection._id}
                      >
                        <CollectionCard data={collection} />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </TabPanel>
            <TabPanel
              value="2"
              sx={{
                padding: "24px 0",
                width: "100%!important",
              }}
            >
              <Grid container spacing={3}>
                {collections?.map((collection) => {
                  if (collection.type === "developer") {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={collection._id}
                      >
                        <CollectionCard data={collection} />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </TabPanel>
          </TabContext>
        )}
        {!loading && error && (
          <p
            style={{
              margin: "initial auto",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            Something went wrong in network
          </p>
        )}
      </div>
    </Container>
  );
};

export default CollectionsPage;
