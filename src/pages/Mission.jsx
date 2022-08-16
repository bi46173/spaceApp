import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import LoadingComponent from "../components/LoadingComponent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Divider, Typography } from "@mui/material";
import moment from "moment";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
} from "firebase/firestore";

export default function Mission() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({ missionComment: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const commentsCollectionRef = collection(db, "comments");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.missionId = id;
    await addDoc(commentsCollectionRef, formData);
    setFormSubmitted(true);
  };

  useEffect(() => {
    let commentsArr = [];
    const getComments = async () => {
      const q = query(collection(db, "comments"), where("missionId", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        commentsArr.push(doc.data());
      });

      setComments(commentsArr);
    };

    getComments();
  }, [formSubmitted]);

  const FIND_LAUNCH_QUERY = gql`
    {
        launch(id: "${id}") {
            id
            rocket {
              rocket_name
              first_stage {
                cores {
                  landing_type
                  landing_vehicle
                  reused
                }
              }
              second_stage {
                block
                payloads {
                  manufacturer
                  nationality
                  orbit
                  payload_mass_kg
                  payload_type
                }
              }
            }
            mission_name
            links {
              flickr_images
            }
            launch_date_local
            launch_site {
              site_id
              site_name
            }
            ships {
              name
              roles
              year_built
              home_port
            }
          }
    }
  `;
  const { data, loading, error } = useQuery(FIND_LAUNCH_QUERY);

  if (loading) return <LoadingComponent />;
  if (error) return <h1>{error.message}</h1>;

  const { launch } = data;
  const { rocket } = launch;
  const { ships } = launch;

  return (
    <Typography component={"span"} variant="body2" color="text.secondary">
      <Grid container spacing={2} columns={16}>
        <Grid item xs={9}>
          <Typography variant="h4" sx={{ m: 1 }}>
            {launch.mission_name}
          </Typography>
          <Typography variant="body1" sx={{ m: 5 }}>
            The mission was launched on{" "}
            {moment(launch.launch_date_local).format("MMMM Do YYYY")} on site '
            {launch.launch_site.site_name}'.The rocket used was{" "}
            {rocket.rocket_name}.The rocket's first stage core landing type was{" "}
            {rocket.first_stage?.cores[0]?.landing_type} and{" "}
            {rocket.first_stage?.cores[0]?.landing_vehicle} landing vehicle.The
            rocket's second stage payload manufacturer is{" "}
            {rocket.second_stage.payloads[0].manufacturer} and its mass{" "}
            {rocket.second_stage.payloads[0].payload_mass_kg} kg.The number of
            ships used for the mission is {ships.length}
          </Typography>
          {launch.links.flickr_images && (
            <Carousel>
              {launch.links.flickr_images.map((image, index) => {
                return (
                  <div key={index}>
                    <img src={image} alt={index} />

                    <p className="legend">Image {index + 1}</p>
                  </div>
                );
              })}
            </Carousel>
          )}
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h4" sx={{ m: 1 }}>
            Comments
          </Typography>
          {comments.length == 0 && (
            <Typography variant="body1" sx={{ m: 2 }}>
              Be the first one to comment!
            </Typography>
          )}
          {comments.map((comment, index) => {
            return (
              <div key={index}>
                <Typography variant="body1" sx={{ m: 2 }}>
                  {comment.missionComment}
                </Typography>
                <Divider />
              </div>
            );
          })}
          <Box sx={{ m: 2 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Comment"
                variant="standard"
                onChange={handleChange}
                name="missionComment"
              />
              <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
                Submit
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Typography>
  );
}
