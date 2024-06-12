import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Delete, Login } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  COLLECTION_CREATE_RESET,
  SAVE_PROJECT_RESET,
  SAVE_USER_RESET,
} from "../constants/collectionConstants";
import {
  getAllCollections,
  saveProjectById,
  createCollection,
  saveUserById,
} from "../actions/collectionAction";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const RightSection = ({
  coll,
  selectedCollection,
  setSelectedCollection,
  added,
  setAdded,
  data,
  type,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 10px",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      <Avatar
        src={
          coll._id === selectedCollection && added
            ? type == "project"
              ? data?.images_url?.[0]
              : data?.profile_image
            : coll?.image
        }
        alt="img"
        variant="square"
      />
      <span style={{ fontWeight: "600" }}>{coll.name}</span>
      {coll._id === selectedCollection || selectedCollection === "" ? (
        !added ? (
          <Button
            variant="contained"
            sx={{ borderRadius: "5px" }}
            onClick={() => {
              setAdded(true);
              setSelectedCollection(coll._id);
            }}
          >
            +
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              borderRadius: "5px",
              background: "red",
              ":hover": { bgcolor: "red" },
            }}
            onClick={() => {
              setAdded(false);
            }}
          >
            <Delete />
          </Button>
        )
      ) : (
        <Button
          variant="contained"
          sx={{ borderRadius: "5px" }}
          onClick={() => {
            setAdded(true);
            setSelectedCollection(coll._id);
          }}
        >
          +
        </Button>
      )}
    </Box>
  );
};

const InputRightSection = ({ collectionName, setCollectionName }) => {
  return (
    <TextField
      label="Collection Name"
      value={collectionName}
      onChange={(e) => setCollectionName(e.target.value)}
      margin="normal"
      fullWidth
    />
  );
};

const AddToCollectionModal = ({ open, setOpen, data, type }) => {
  const dispatch = useDispatch();
  const [collectionName, setCollectionName] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [added, setAdded] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
    setCreateAction(false);
    setCollectionName("");
  };

  const {
    success: saveProjectSuccess,
    error: saveProjectError,
    collection: saveProjectCollection,
  } = useSelector((state) => state.saveProject);
  const {
    success: saveUserSuccess,
    error: saveUserError,
    collection: saveUserCollection,
  } = useSelector((state) => state.saveUser);
  const { loading, collections } = useSelector((state) => state.collectionList);

  const { success: collectionCreateSuccess } = useSelector(
    (state) => state.collectionCreate
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const [createAction, setCreateAction] = useState(false);

  useEffect(() => {
    if (saveProjectSuccess) {
      toast.success(
        `Project successfully added in ${saveProjectCollection?.name}`
      );
      dispatch({ type: SAVE_PROJECT_RESET });
    }
    if (!saveProjectSuccess && saveProjectError) {
      toast.error(saveProjectError);
      dispatch({ type: SAVE_PROJECT_RESET });
    }
    if (collectionCreateSuccess) {
      dispatch(getAllCollections());
      dispatch({ type: COLLECTION_CREATE_RESET });
    }
  }, [saveProjectError, saveProjectSuccess, collectionCreateSuccess, dispatch]);

  useEffect(() => {
    if (saveUserSuccess && !saveUserError) {
      toast.success(`User successfully added in ${saveUserCollection?.name}`);
      dispatch({ type: SAVE_USER_RESET });
    }
    if (!saveUserSuccess && saveUserError) {
      toast.error(saveUserError);
      dispatch({ type: SAVE_USER_RESET });
    }
  }, [saveUserError, saveUserSuccess]);

  useEffect(() => {
    dispatch(getAllCollections());
    setAdded(false);
    setSelectedCollection("");
  }, []);

  useEffect(() => {
    const currCollection = collections?.filter((coll) => coll.type === type);
    if (collections && currCollection.length === 0) {
      setCreateAction(true);
    } else {
      setCreateAction(false);
    }
  }, [collections]);

  const saveCollectionHandler = () => {
    if (!createAction) {
      if (type === "project") {
        dispatch(saveProjectById(data?._id, selectedCollection));
      }
      if (type === "developer") {
        dispatch(saveUserById(data?._id, selectedCollection));
      }
      setOpen(false);
    } else {
      dispatch(createCollection({ name: collectionName, type }));
      setCreateAction(false);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {userInfo ? (
        <>
          <DialogTitle id="alert-dialog-title">
            {createAction ? "Add to Collection" : "Create a new Collection"}
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              gap: "0.5rem",
              flexDirection: matches ? "column" : "row",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "200px",
              }}
            >
              {type === "project" && (
                <img
                  src={data?.images_url?.[0]}
                  alt="image"
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
              )}
              {type === "developer" && (
                <Avatar
                  sx={{ width: "150px", height: "150px", bgcolor: "red" }}
                >
                  {data?.profile_image && data?.profile_image !== "null" ? (
                    <img
                      height="100%"
                      width="100%"
                      src={data?.profile_image}
                      alt=""
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    `${data?.first_name?.[0].toUpperCase()}${data?.last_name?.[0].toUpperCase()}`
                  )}
                </Avatar>
              )}
              <div
                style={{ display: "flex", padding: "10px 0", gap: "0.5rem" }}
              >
                {type === "projects" && (
                  <Avatar
                    src={data?.user_id?.profile_image}
                    alt="userProfile"
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="subtitile1" sx={{ fontWeight: "600" }}>
                    {data?.name || `${data?.first_name} ${data?.last_name}`}
                  </Typography>
                  <span>@{data?.user_id?.username || data?.username}</span>
                  {type === "developer" && (
                    <Typography variant="subtitle1">{data?.title}</Typography>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "0.5rem",
              }}
            >
              {loading ? (
                <Spinner />
              ) : createAction ? (
                <InputRightSection
                  collectionName={collectionName}
                  setCollectionName={setCollectionName}
                />
              ) : (
                collections?.map((coll) => {
                  if (coll.type === type) {
                    return (
                      <RightSection
                        coll={coll}
                        selectedCollection={selectedCollection}
                        setSelectedCollection={setSelectedCollection}
                        added={added}
                        setAdded={setAdded}
                        key={coll._id}
                        data={data}
                        type={type}
                      />
                    );
                  }
                })
              )}
              <DialogActions>
                <Button onClick={handleClose} sx={{ color: "red" }}>
                  Close
                </Button>
                {collections?.length && (
                  <Button
                    disabled={added || collectionName !== "" ? false : true}
                    onClick={saveCollectionHandler}
                    variant="contained"
                    sx={{ borderRadius: "5px" }}
                  >
                    Save
                  </Button>
                )}
                {!createAction && (
                  <Button
                    variant="contained"
                    sx={{ borderRadius: "5px" }}
                    onClick={() => {
                      setCreateAction(true);
                    }}
                  >
                    Create
                  </Button>
                )}
              </DialogActions>
            </div>
          </DialogContent>
        </>
      ) : (
        <div
          style={{
            width: "320px",
            height: "240px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.2rem",
            fontWeight: "700",
          }}
        >
          Please{" "}
          <Link
            to="/signin"
            style={{
              paddingLeft: "0.5rem",
              textDecoration: "underline!important",
            }}
          >
            Login
            <IconButton>
              <Login />
            </IconButton>
          </Link>{" "}
          to continue
        </div>
      )}
    </Dialog>
  );
};

export default AddToCollectionModal;
