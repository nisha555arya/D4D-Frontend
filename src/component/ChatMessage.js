const ChatMessage = (props) => {
  let time = new Date(props.time);
  time = time.toLocaleString("en-IN").split(", ")[1];
  const meridian = time.split(" ")[1];
  time = time.split("");
  let cnt = 0;
  time = time
    .filter((c) => {
      if (c === ":") cnt++;
      return cnt !== 2;
    })
    .join("");
  time = time + " " + meridian;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: props.sent === "true" ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          wordBreak: "break-all",
          backgroundColor: props.sent === "true" ? "#4e426d" : "#4cacbc22",
          padding: "10px 55px 15px 15px",
          color: props.sent === "true" ? "#eee" : "#222",
          borderRadius:
            props.sent === "true" ? "15px 0 15px 15px" : "0px 15px 15px 15px",
          display: "flex",
          margin: "6px 30px",
          fontSize: "18px",
          position: "relative",
        }}
      >
        <p>{props.message}</p>
        <p
          style={{
            textAlign: "right",
            fontSize: "12px",
            marginLeft: "6px",
            marginTop: "4px",
            position: "absolute",
            right: "10px",
            bottom: "7px",
            color: props.sent === "true" ? "#ccc" : "#888",
          }}
        >
          {time}
        </p>
      </div>
    </div>
  );
};
export default ChatMessage;
