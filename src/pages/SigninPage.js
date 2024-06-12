import { Typography, useMediaQuery, Grid, Container } from "@mui/material";
import img from "./../images/DrawKit Vector Illustration Project Manager (5).png";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import SigninForm from "../component/SigninForm";
import { getMyProfile, login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const { user } = useSelector((state) => state.userDetails);

  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !error && userInfo) {
      if (!user) {
        dispatch(getMyProfile(userInfo));
      }
      if (user && !user?.username) {
        toast.success("User successfully logged in");
        navigate("/edit/basic-details");
      }
      if (user?.username) {
        navigate("/");
      }
    } else {
      toast.error(error);
    }
  }, [user, userInfo, error, navigate, loading, dispatch]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const matchessm = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesxs = useMediaQuery("(min-width:500px)");

  return (
    <Container maxWidth="xl">
      <Grid
        container
        justifyContent="space-between"
        sx={{
          minHeight: "calc(100vh - 35px)",

          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={6}>
          {matchesxs && (
            <>
              <div
                style={{
                  backgroundColor: "#4cacbc",
                  width: matchessm ? "60px" : "90px",
                  height: matchessm ? "60px" : "90px",
                  borderRadius: "50%",
                  position: "absolute",
                  zIndex: "-1",
                  left: "10px",
                  top: "10px",
                }}
              ></div>

              <div
                style={{
                  backgroundColor: "#4cacbc",
                  width: matchessm ? "20px" : "40px",
                  height: matchessm ? "20px" : "40px",
                  borderRadius: "50%",
                  position: "absolute",
                  zIndex: "-1",
                  left: matchessm ? "70px" : "100px",
                  top: matchessm ? "70px" : "100px",
                }}
              ></div>
            </>
          )}

          {matches && <img src={img} alt="" style={{ width: "100%" }} />}
        </Grid>
        <Grid item xs={12} md={6}>
          <div
            style={{
              backgroundColor: "#4cacbc",
              width: "100px",
              height: "100px",
              borderRadius: "0 0 0 100%",
              position: "absolute",
              zIndex: "-1",
              right: "0",
              top: "0",
            }}
          ></div>
          <Typography
            variant="h3"
            align="center"
            style={{
              color: "#4cacbc",
              fontWeight: "600",
              marginBottom: "30px",
            }}
          >
            Welcome Back!
          </Typography>
          <SigninForm formik={formik} />
          <Typography
            paragraph
            align="center"
            sx={{ fontSize: "15px", fontWeight: "500" }}
          >
            New here?{"  "}
            <RouterLink
              to="/signup"
              style={{ color: "#4cacbc", fontWeight: "600" }}
            >
              Create account
            </RouterLink>
          </Typography>
          <Typography
            paragraph
            align="center"
            sx={{ fontSize: "15px", fontWeight: "500" }}
          >
            Return to{" "}
            <RouterLink to="/" style={{ color: "#4cacbc", fontWeight: "600" }}>
              HomePage
            </RouterLink>
          </Typography>
          <div
            style={{
              backgroundColor: "#4cacbc",
              width: "150px",
              height: "150px",
              borderRadius: "0 100% 0 0",
              position: "absolute",
              zIndex: "-1",
              left: "0",
              bottom: "0",
            }}
          ></div>

          {matchesxs && (
            <>
              <div
                style={{
                  backgroundColor: "#4cacbc",
                  width: matchessm ? "20px" : "40px",
                  height: matchessm ? "20px" : "40px",
                  borderRadius: "50%",
                  position: "absolute",
                  zIndex: "-1",
                  right: matchessm ? "70px" : "100px",
                  bottom: matchessm ? "70px" : "100px",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "#4cacbc",
                  width: matchessm ? "60px" : "90px",
                  height: matchessm ? "60px" : "90px",
                  borderRadius: "50%",
                  position: "absolute",
                  zIndex: "-1",
                  right: "10px",
                  bottom: "10px",
                }}
              ></div>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
