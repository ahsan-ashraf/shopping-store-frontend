import React from "react";
import { Container, Box, Typography, TextField, Button, Grid, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppRoutes } from "../../routes/routes-metadata";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 6,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h4" mb={3} textAlign="center">
          Login
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate>
          <Grid container sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {/* Email */}
            <Grid sx={{ flex: 1, minWidth: "100%" }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            {/* Password */}
            <Grid sx={{ flex: 1, minWidth: "100%" }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Grid sx={{ flex: 1, minWidth: "100%" }}>
              <Button type="submit" variant="contained" fullWidth disabled={!formik.dirty || !formik.isValid}>
                Login
              </Button>
            </Grid>

            <Grid sx={{ flex: 1, minWidth: "100%", textAlign: "center" }}>
              <Typography variant="body2">
                Don&apos;t have an account? {/* TODO: fix it later Create one: "navigate(`${AppRoutes.Registration}/buyer`)}" */}
                <Link component="button" underline="hover" onClick={() => navigate(`${AppRoutes.Registration}/buyer`)}>
                  Create one
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
