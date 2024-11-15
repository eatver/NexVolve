import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { useQuery } from "@apollo/client";
import Subscriptions from "../components/Subscriptions";
import WatchList from "../components/WatchList";

import Auth from "../utils/auth";
import { GET_ME } from "../utils/queries";
import { Redirect } from "react-router";
import UpperNavBar from "../components/UpperNavBar";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Subtrackt
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const mdTheme = createTheme();

function Dashboard() {
  const { loading, data } = useQuery(GET_ME);
  const { subscriptions, watchList } = data?.me || {};

  if (!Auth.loggedIn()) {
    return <Redirect to="/login" />;
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <UpperNavBar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* List all the user's Subscriptions */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  {loading ? (
                    <span>Loading...</span>
                  ) : (
                    <Subscriptions subscriptions={subscriptions} />
                  )}
                </Paper>
              </Grid>
              {/* List the user's Watch List*/}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {loading ? (
                    <span>Loading...</span>
                  ) : (
                    <WatchList watchList={watchList} />
                  )}
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
