import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { ChatContact, Spinner } from "./../component";
import Divider from "@mui/material/Divider";
import { useSelector, useDispatch } from "react-redux";
import { getAllConversations, getAllMessages } from "../actions/chatActions";
import React, { useEffect, useRef } from "react";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useMediaQuery } from "@mui/material";
const ChatPage = (props) => {
  const dispatch = useDispatch();
  const params = useParams;
  const id = params.id;

  //const [socket, setSocket] = useState(null);
  const { userInfo } = useSelector((state) => state.userLogin);
  const socket = useRef();
  useEffect(() => {
    socket.current = io("https://socketserver-io.onrender.com");
    props.socketHandler(socket.current);
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", userInfo._id);
    socket.current.on("getUsers", (users) => {});
  }, [userInfo]);

  const { loading, error, conversations } = useSelector(
    (state) => state.conversationList
  );

  useEffect(() => {
    dispatch(getAllConversations(userInfo));
  }, []);

  const [searchText, setSearchText] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);

  useEffect(() => {
    if (!conversations) return;
    if (searchText?.trim().length === 0)
      setFilteredConversations(conversations);
    else {
      const filteredArr = conversations.filter((data) => {
        const details =
          userInfo._id === data.member1_id._id
            ? data.member2_id
            : data.member1_id;
        return `${details.first_name} ${details.last_name}`
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
      setFilteredConversations(filteredArr);
    }
  }, [searchText, conversations, userInfo]);

  const matches = useMediaQuery("(max-width:1200px)");
  const matchesMd = useMediaQuery("(max-width:899px)");
  const location = useLocation();

  return (
    <>
      <Grid
        item
        xs={12}
        md={5}
        lg={4}
        xl={3}
        sx={{
          height: "100%",
          display:
            location.pathname !== "/chat" && matchesMd ? "none" : "initial",
        }}
      >
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <FormControl
            sx={{
              m: 1,
              backgroundColor: "#fff",
              borderRadius: "30px",
              width: matches ? "calc(100% - 70px)" : "100%",
              margin: matches ? "20px 35px" : "20px 70px",
            }}
            className="searchInput"
          >
            {searchText === "" && (
              <InputLabel shrink={false} htmlFor="outlined-adornment">
                Search
              </InputLabel>
            )}
            <OutlinedInput
              id="outlined-adornment"
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Search"
            />
          </FormControl>
        </form>
        <Grid
          container
          sx={{
            backgroundColor: "#fff",
            height: "calc(100vh - 180px)",
            borderRadius: "20px",
            margin: matches ? "0 35px" : "0 70px",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            overflowY: "scroll",
            width: matches ? "calc(100% - 70px)" : "100%",
          }}
        >
          {loading && <Spinner class={"loading-container"} />}
          {!loading &&
            !error &&
            !(location.pathname !== "/chat" && matchesMd) &&
            filteredConversations.map((elem) => {
              return (
                <RouterLink
                  to={`/chat/${elem._id}`}
                  key={elem._id}
                  style={{ width: "100%", color: "#000" }}
                >
                  <ChatContact data={elem} />
                  <Divider
                    style={{
                      width: "calc(100% - 130px)",
                      margin: "0px 45px 0px 85px",
                      height: "5px",
                    }}
                  />
                </RouterLink>
              );
            })}
        </Grid>
      </Grid>
      {props.isConvOpen === "false" && (
        <Grid item sm={8} md={7} lg={8} xl={9} sx={{ height: "100%" }}>
          <div
            style={{
              backgroundColor: "#fff",
              height: "calc(100vh - 180px)",
              borderRadius: "20px",
              margin: matches ? "95px 35px 95px 0 " : "95px 65px 95px 95px",
              display: matchesMd ? "none" : "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "28px",
            }}
          >
            <p>Open a conversation to start chat.</p>
          </div>
        </Grid>
      )}
    </>
  );
};

export default ChatPage;
