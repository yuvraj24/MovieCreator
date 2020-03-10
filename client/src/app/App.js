import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MovieIcon from "@material-ui/icons/MovieFilterRounded";
import CreateIcon from "@material-ui/icons/Add";
import MovieList from "../pages/MoviesList";
import MoviesInsert from "../pages/MoviesInsert";
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  NavLink
} from "react-router-dom";
import { Link } from "@material-ui/core";
import { Colors } from "../utils/colors";
import MovieInsert from "../pages/MoviesInsert";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function App() {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = Colors.app_bg_color;
  });

  const navigateCreateMovie = event => {
    event.preventDefault();
    setOpen(true);
    // window.location.href = "/movies/create";
  };

  console.log("isOpen => ", isOpen);

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MovieIcon style={{ fontSize: 26 }} />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Movies
            </Typography>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
            >
              <CreateIcon
                style={{ fontSize: 26 }}
                onClick={event => navigateCreateMovie(event)}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* <MovieList /> */}
        {isOpen && <MovieInsert isOpen={isOpen} handleCloseClick={() => setOpen(false)} />}
      </div>

      <Switch>
        <Route path="/movies/create" exact component={MoviesInsert} />
        <Route path="/" exact component={MovieList} />
      </Switch>
    </Router>
  );
}
