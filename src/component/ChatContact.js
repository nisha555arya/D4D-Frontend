import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const ChatContact = ({ data }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const details =
    userInfo._id === data.member1_id._id ? data.member2_id : data.member1_id;
  return (
    <Grid container item sx={{ padding: "10px 15px", alignItems: "center" }}>
      <Grid item xs={3}>
        {details.profile_image && (
          <img
            src={details.profile_image}
            alt=""
            style={{ borderRadius: "50%", height: "50px", width: "50px" }}
          />
        )}
        {!details.profile_image && (
          <AccountCircleIcon
            sx={{
              borderRadius: "50%",
              height: "60px",
              width: "60px",
              color: "#aaa",
            }}
          />
        )}
      </Grid>
      <Grid item xs={6}>
        <p
          style={{
            fontSize: "19px",
            fontWeight: "500",
          }}
        >
          {details.first_name + " " + details.last_name}
        </p>
      </Grid>
    </Grid>
  );
};
export default ChatContact;
