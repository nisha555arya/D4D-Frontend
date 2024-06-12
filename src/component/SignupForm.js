import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useSelector } from "react-redux";
import {
  Typography,
  useMediaQuery,
  InputAdornment,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Spinner from "./Spinner";
const SignupForm = ({ formik }) => {
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;
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
          id="first_name"
          name="first_name"
          label="First Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: matches ? "350px" : "470px" }}
          value={formik.values.first_name}
          onChange={formik.handleChange}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={formik.touched.first_name && formik.errors.first_name}
          margin="normal"
        />
        <TextField
          fullWidth
          id="last_name"
          name="last_name"
          label="Last Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: matches ? "350px" : "470px" }}
          value={formik.values.last_name}
          onChange={formik.handleChange}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
          margin="normal"
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
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
                <LockOutlinedIcon />
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
            fontWeight: "470",
            padding: "10px 64px",
            margin: "30px auto",
            display: "block",
            backgroundColor: "#4cacbc",
          }}
          className="btn"
        >
          {loading && <Spinner />}
          SIGN UP
        </Button>
      </form>
    </Grid>
  );
};
export default SignupForm;
