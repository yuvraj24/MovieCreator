import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/LocationCity";
import RateIcon from "@material-ui/icons/StarRate";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "25%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const MovieCard = ({ movie }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    console.log(movie);
  }, []);

  return (
    <Card
      className={classes.root}
      style={{ marginLeft: "2%", marginTop: "2%" }}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {movie ? movie.name.slice(0, 1) : ""}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={movie ? movie.name : ""}
        subheader={
          movie.updatedAt ? moment(movie.updatedAt).format("MMMM DD, YYYY") : ""
        }
      />
      {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="address"
          align="left"
          noWrap="true"
          display="block"
          style={{maxLines: 3, position: 'relative'}}
        >
          {movie ? movie.description : ""}
        </Typography>
      </CardContent>
      <CardActions
        style={{ flexDirection: "column", alignItems: "flex-start",marginTop: -10 }}
      >
        <div
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginLeft: -5,   
          }}
        >
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <Typography
            variant="inherit"
            color="textSecondary"
            component="textPath"
            style={{ fontSize: 16, justifySelf:'center' }}
          >
            Location : {movie ? movie.location : ""}
          </Typography>
        </div>

        <div
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginLeft: -10
          }}
        >
          <IconButton aria-label="add to favorites">
            <RateIcon style={{ fontSize: 30 }} />
          </IconButton>
          <Typography
            variant="inherit"
            color="textSecondary"
            component="text"
            style={{ fontSize: 16, marginTop: "1%" }}
          >
            Rating : {movie ? movie.rating : ""}
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
