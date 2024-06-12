import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";
import ChatMessage from "../component/ChatMessage";
import Spinner from "./../component/Spinner";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createMessage, getAllMessages } from "../actions/chatActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MESSAGE_CREATE_RESET } from "../constants/chatConstants";
import ScrollableFeed from "react-scrollable-feed";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Chats = (props) => {
  // to get the conversation id
  const { id } = useParams();

  //to set current new message text
  const [text, setText] = useState();

  const [curConv, setCurConv] = useState();
  const [curReceiver, setCurReceiver] = useState();

  const [curMessages, setCurMessages] = useState();
  const [arrivedMessage, setArrivedMessage] = useState(null);
  const dispatch = useDispatch();

  //to get msgs of current conversation
  const { loading, error, messages } = useSelector(
    (state) => state.messageList
  );

  const {
    loading: sentLoading,
    error: sentError,
    sentMessage,
  } = useSelector((state) => state.messageCreate);

  //to get list of conversations
  const {
    loading: convLoading,
    error: convError,
    conversations,
  } = useSelector((state) => state.conversationList);

  //to set current receiver
  useEffect(() => {
    if (!convLoading && !convError) {
      const curConversation = conversations.find((conv) => conv._id === id);
      if (curConversation) {
        const receiver =
          curConversation.member1_id._id === userInfo._id
            ? curConversation.member2_id
            : curConversation.member1_id;

        setCurReceiver(receiver);
        setCurConv(curConversation);
      }
    }
  }, [conversations, id]);

  //to get currently logged in user's info
  const { userInfo } = useSelector((state) => state.userLogin);

  //to fetch all messages of current conversation
  useEffect(() => {
    dispatch(getAllMessages(userInfo, id));
  }, [id]);

  //to send a message
  const handleSubmit = (e) => {
    e.preventDefault();

    props.socket.emit("sendMessage", {
      senderId: userInfo._id,
      receiverId: curReceiver._id,
      text,
    });
    dispatch(createMessage({ conversationId: id, text }, userInfo));
    setText("");
  };

  useEffect(() => {
    props.socket?.on("getMessage", (data) => {
      const obj = {
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      };

      setArrivedMessage(obj);
    });
  }, [props.socket]);

  useEffect(() => {
    if (
      arrivedMessage &&
      (arrivedMessage.senderId === curConv.member1_id._id ||
        arrivedMessage.senderId === curConv.member2_id._id)
    ) {
      setCurMessages((prev) => [...prev, arrivedMessage]);
    }
  }, [arrivedMessage]);

  useEffect(() => {
    if (messages) {
      setCurMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (sentMessage) {
      setCurMessages((prev) => [...prev, sentMessage]);
      dispatch({ type: MESSAGE_CREATE_RESET });
    }
  }, [sentMessage]);

  const matches = useMediaQuery("(max-width:1200px)");
  const matchesMd = useMediaQuery("(max-width:899px)");

  return (
    <Grid item xs={12} md={7} lg={8} xl={9} sx={{ height: "100%" }}>
      <div
        style={{
          backgroundColor: "#fff",

          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          //padding: "20px",

          margin: matchesMd
            ? "25px"
            : matches
            ? "95px 35px 95px 0 "
            : "95px 65px 95px 95px",
          height: matchesMd ? "calc(100% - 50px)" : "calc(100vh - 180px)",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "#4cacbc",
            padding: "10px 20px",
            alignItems: "center",
            borderRadius: "20px 20px 0 0",
          }}
        >
          {curReceiver?.profile_image && (
            <img
              style={{ height: "40px", width: "40px", borderRadius: "50%" }}
              src={curReceiver?.profile_image}
            />
          )}
          {!curReceiver?.profile_image && (
            <AccountCircleIcon
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                color: "#aaa",
                backgroundColor: "#fff",
              }}
            />
          )}
          <span
            style={{
              fontSize: "18px",
              color: "#fff",
              fontWeight: "600",
              padding: "10px",
            }}
          >
            {curReceiver?.first_name + " " + curReceiver?.last_name}
          </span>
        </div>

        <div
          className="chat-container"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flexStart",
            overflowY: "scroll",
          }}
        >
          <ScrollableFeed>
            {loading && <Spinner class={"loading-container"} />}
            {!loading &&
              !error &&
              curMessages &&
              curMessages.map((elem) => {
                return (
                  <ChatMessage
                    key={elem._id}
                    message={elem.text}
                    time={elem.createdAt}
                    sent={userInfo._id === elem.senderId ? "true" : "false"}
                  />
                );
              })}
            {!loading && error && <p>{error}</p>}
          </ScrollableFeed>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <FormControl
            sx={{
              m: 1,
              width: "25ch",
              backgroundColor: "#efefef",
              borderRadius: "30px",
              width: "calc(100% - 150px)",
              margin: "20px 20px 20px 40px",
            }}
            // variant="standard"
            className="chatInput"
          >
            {!text && (
              <InputLabel shrink={false} htmlFor="outlined-adornment">
                Type a message
              </InputLabel>
            )}
            <OutlinedInput
              id="outlined-adornment"
              // label={value ? " " : "my label"}
              sx={{}}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoComplete="off"
            />
          </FormControl>
          <button
            style={{
              backgroundColor: "#4cacbc",
              color: "#fff",
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              border: "none",
              outline: "none",
              marginTop: "20px",
              textAlign: "center",
              cursor: "pointer",
            }}
            type="submit"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </Grid>
  );
};

export default Chats;
