import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  Link,
  useMediaQuery,
} from "@mui/material";
import { MoreVert, Edit, Delete, Send } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createReply, deleteComment } from "../actions/commentAction";
import { toast } from "react-toastify";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const CommentBody = ({
  comment,
  setOpenModal,
  setCommentStatement,
  setEditComment,
  setCommentId,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [replyModal, setReplyModal] = useState(false);
  const [viewReply, setViewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { user } = useSelector((state) => state.userDetails);

  const handleOpenProjectMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseProjectMenu = () => {
    setAnchorElUser(null);
  };
  const commentEditHandler = (e) => {
    if (comment.user_id._id === userInfo._id) {
      setOpenModal(true);
      setEditComment(true);
      setCommentId(comment._id);
      setCommentStatement(comment.body);
      handleCloseProjectMenu();
    } else toast.error("Only the author can update its comment");
  };

  return (
    <Box sx={{ padding: ".5rem 0", display: "flex", gap: ".75rem" }}>
      <Avatar src={comment?.user_id?.profile_image} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: matches ? "flex-start" : "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: matches ? "0.3rem" : "0.7rem",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "600",
                  lineHeight: matches ? "1" : "1.4",
                  fontSize: matches ? "18px" : "1.25rem",
                }}
              >
                {comment?.user_id?.first_name +
                  " " +
                  comment?.user_id?.last_name}
              </Typography>
              <span>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <Typography variant="p" sx={{ color: "rgb(115 121 128/1)" }}>
              {comment?.user_id?.title}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              color: "rgb(115 121 128/1)",
              fontWeight: "600",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => {
                if (!userInfo) {
                  navigate("/signin");
                } else {
                  setReplyModal(!replyModal);
                }
              }}
              style={{ padding: matches ? "0" : "6px 8px" }}
            >
              Reply
            </Button>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                aria-label="settings"
                onClick={handleOpenProjectMenu}
                style={{ padding: matches ? "0" : "8px" }}
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
                <MenuItem comment={comment} onClick={commentEditHandler}>
                  <Edit />
                  <Typography textAlign="center">Edit</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(deleteComment(userInfo, comment._id));
                    handleCloseProjectMenu();
                  }}
                >
                  <Delete />
                  <Typography textAlign="center">Delete</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </div>
        </div>
        <Typography variant="p">{comment.body}</Typography>
        {replyModal && (
          <Box
            sx={{
              padding: "20px 0 15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flex: 1,
                width: "100%",
              }}
            >
              <Avatar src={user.profile_image} />
              <TextField
                placeholder={`comment as ${user.full_name}`}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                fullWidth
                size="small"
              />
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button variant="text" onClick={() => setReplyModal(false)}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => {
                  dispatch(createReply(userInfo, { body: reply }, comment._id));
                  setReply("");
                  setViewReply(true);
                }}
              >
                <Send />
                Post
              </Button>
            </div>
          </Box>
        )}
        {viewReply &&
          comment?.replies?.map((r, i) => (
            <Box
              sx={{ padding: "1rem 0", display: "flex", gap: ".75rem" }}
              key={i}
            >
              <Avatar src={r?.user_id?.profile_image} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "0.7rem",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: "600",
                          lineHeight: "1.4",
                        }}
                      >
                        {r?.user_id?.first_name +
                          " " +
                          comment?.user_id?.last_name}
                      </Typography>
                      <span style={{ paddingLeft: "5px" }}>
                        {moment(comment.createdAt).fromNow()}
                      </span>
                    </div>

                    <Typography
                      variant="p"
                      sx={{ color: "rgb(115 121 128/1)" }}
                    >
                      {r?.user_id?.title}
                    </Typography>
                  </div>
                </div>
                <Typography variant="p">{r.body}</Typography>
              </Box>
            </Box>
          ))}
        {comment?.replies?.length > 0 && !viewReply ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: ".5rem",
            }}
          >
            <Link
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setViewReply(true);
              }}
            >
              View replies
            </Link>
            |<span>{comment.replies.length} Reply</span>
          </div>
        ) : comment?.replies?.length > 0 && viewReply ? (
          <Link
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setViewReply(false);
            }}
          >
            Show less
          </Link>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default CommentBody;
