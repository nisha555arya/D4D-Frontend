import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCollection,
  updateCollection,
} from "../actions/collectionAction";
import { toast } from "react-toastify";
import { COLLECTION_UPDATE_RESET } from "../constants/collectionConstants";

const CollectionCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [collection, setCollection] = useState(data);

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const {
    success: updateSuccess,
    collection: updatedCollectionValue,
    error: updateError,
  } = useSelector((state) => state.collectionUpdate);

  useEffect(() => {
    if (updateSuccess && collection._id == updatedCollectionValue._id) {
      toast.success("Collection successfully updated");
      setCollection(updatedCollectionValue);
      dispatch({ type: COLLECTION_UPDATE_RESET });
    }
    if (!updateSuccess && updateError) {
      toast.error(updateError);
    }
  }, [updateSuccess, updateError]);

  return (
    <div>
      <Card sx={{ maxWidth: 320, margin: "0 auto" }}>
        <Link to={`/collections/${collection._id}`}>
          <CardMedia>
            <img
              src={collection.image}
              alt="collection-name"
              style={{ width: "100%", objectFit: "cover", height: "200px" }}
            />
          </CardMedia>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5px 10px 10px!important",
              color: "#000",
            }}
          >
            <div>
              <h3>{collection?.name}</h3>
              <p>
                {collection?.type === "project"
                  ? collection?.project_id?.length
                  : collection?.developer_id?.length}{" "}
                Items
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "5px",
                  background: "rgb(23 124 226/0.3)",
                  color: "#000",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                <Edit />
              </Button>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "5px",
                  background: "rgb(244 60 60/0.4)",
                  color: "#000",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(deleteCollection(collection._id));
                }}
              >
                <Delete />
              </Button>
            </div>
          </CardContent>
        </Link>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ padding: "16px 24px 8px" }}>
          {"Edit Collection Name"}
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "5px 15px!important",
            minWidth: { xs: "320px", sm: "600px" },
          }}
        >
          <TextField
            fullWidth
            id="collectionName"
            name="Collection name"
            label="Collection Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            focused
          />
        </DialogContent>
        <DialogActions sx={{ paddingBottom: "15px" }}>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ borderRadius: "5px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(updateCollection({ name }, collection._id));
              setOpen(false);
            }}
            variant="contained"
            sx={{ borderRadius: "5px" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CollectionCard;
