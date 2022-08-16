import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import "./index.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import reportWebVitals from "./reportWebVitals";
import {
  createTheme,
  CssBaseline, // removes margins
  ThemeProvider,
} from "@mui/material";
import Mission from "./pages/Mission";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
    },
  },
});

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       {
//         launchesPast(limit: 15) {
//           mission_name
//           launch_date_local
//           launch_site {
//             site_name_long
//           }
//           links {
//             flickr_images
//           }
//           launch_year
//           id
//           rocket {
//             rocket_name
//             rocket_type
//           }
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/:id" element={<Mission />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
