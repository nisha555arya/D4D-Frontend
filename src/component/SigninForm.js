import { LockOutlined, MailOutline } from "@mui/icons-material";
import {
  Typography,
  useMediaQuery,
  InputAdornment,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const SigninForm = ({ formik }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid container justifyContent="center">
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutline />
              </InputAdornment>
            ),
          }}
          sx={{ width: matches ? "350px" : "470px" }}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined />
              </InputAdornment>
            ),
          }}
          sx={{ width: matches ? "350px" : "470px" }}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />
        {error && (
          <Typography
            paragraph
            align="center"
            sx={{ marginBottom: "0", color: "red" }}
          >
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          type="submit"
          size="large"
          sx={{
            borderRadius: "22px",
            color: "#fff",
            fontWeight: "500",
            padding: "10px 64px",
            margin: "30px auto",
            display: "flex",
            backgroundColor: "#4cacbc",
          }}
          className="btn"
        >
          {" "}
          {loading && (
            <Spinner class="" color="#fff" height="20px" width="20px" />
          )}
          <span style={{ paddingLeft: "6px" }}>SIGN IN</span>
        </Button>
      </form>
    </Grid>
  );
};
export default SigninForm;
