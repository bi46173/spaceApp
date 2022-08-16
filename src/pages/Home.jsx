import React from "react";
import { useQuery, gql } from "@apollo/client";
import LoadingComponent from "../components/LoadingComponent";
import Grid from "@mui/material/Grid";
import LaunchCard from "../components/LaunchCard";
import { Typography } from "@mui/material";

const LAUNCHES_QUERY = gql`
  {
    launchesPast(limit: 15) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        flickr_images
      }
      launch_year
      id
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(LAUNCHES_QUERY);

  if (loading) return <LoadingComponent />;
  if (error) return <h1>{error.message}</h1>;
  const { launchesPast } = data;
  return (
    <>
      <Typography align="center" variant="h4" sx={{ m: 5 }}>
        Past missions
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ mb: 5 }}
      >
        {launchesPast.map((launch, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <LaunchCard data={launch} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
