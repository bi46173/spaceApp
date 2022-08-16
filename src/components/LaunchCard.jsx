import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import moment from "moment";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function LaunchCard(props) {
  const { data } = props;
  let src = data.links.flickr_images[0]
    ? data.links.flickr_images[0]
    : "/no-photo-available.png";
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to={`/${data.id}`}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {data.mission_name[0]}
            </Avatar>
          }
          title={data.mission_name}
          subheader={`Launch Date: ${moment(data.launch_date_local).format(
            "MMMM Do YYYY"
          )}`}
        />
        <CardMedia
          component="img"
          className="rocketImage"
          height="400"
          image={src}
          alt={data.mission_name}
        />
        <CardContent>
          <Typography component={"span"} variant="body2" color="text.secondary">
            <Grid container spacing={2} columns={16}>
              <Grid item xs={4}>
                Site:
              </Grid>
              <Grid item xs={12}>
                {data.launch_site.site_name_long}
              </Grid>
              <Grid item xs={4}>
                Rocket:
              </Grid>
              <Grid item xs={12}>
                {data.rocket.rocket_name}
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <RocketLaunchIcon />
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
