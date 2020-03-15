import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import apis, { getAllMovies } from "../api/api";

import MovieCard from "../components/MovieCard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MoviesInsertUpdate from "./MoviesInsertUpdate";
import { Snackbar } from "@material-ui/core";
import SnackBarComp from "../components/SnackBarComp";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: theme.palette.background.default
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
}));

export default function MovieList() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [showMessage, setShowMessage] = React.useState({});

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    getAllMovies()
      .then(res => {
        console.log(JSON.stringify(res));
        setData(res.data.data);
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  const onMenuClick = (type, movie) => {
    // alert(movie)
    switch (type) {
      case 1:
        setOpen({ status: true, movie: movie });
        break;

      case 2:
        handleDeleteClick(movie);
        break;

      default:
        break;
    }
  };

  const handleDeleteClick = movie => {
    if (
      window.confirm(
        `Do tou want to delete the movie ${movie.name} permanently?`
      )
    ) {
      apis
        .deleteMovieById(movie._id)
        .then(res => {
          console.log("Delete Response : " + res);
          setShowMessage({
            status: true,
            message: res.data.message
          });
          refreshPage();
        })
        .catch(err => {
          console.log("Delete Error Response : " + JSON.stringify(err));
          setShowMessage({ status: true, message: JSON.stringify(err) });
        });
    }
  };

  const refreshPage = () => {
    setOpen({ status: false, movie: "" });
    // window.location.href = "/";
    // window.location.reload();
    getMovies();
  };

  return (
    <Router>
      <div
        className={classes.root}
        style={{ backgroundColor: "#EFEFEF", height: "100%" }}
      >
        <GridList style={{ paddingBottom: "2%" }}>
          {/* <GridListTile key="Subheader" cols={2} style={{fontSize: 30, height: "auto" }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile> */}
          {data.map(tile => (
            <MovieCard movie={tile} onMenuClick={onMenuClick} />
          ))}
        </GridList>

        <MoviesInsertUpdate
          isOpen={isOpen.status}
          movieUpdate={isOpen.movie}
          handleCloseClick={() => {
            refreshPage();
          }}
        />

        <SnackBarComp
          isShowMessage={showMessage.status}
          messageInfo={showMessage.message}
          changeMsgStatus={() => setShowMessage({ status: false, message: "" })}
        />
      </div>
      {/* <Switch>
        <Route path="/movies/create" exact component={MovieInsert} />
        <Route path="/" exact component={MovieList} />
      </Switch> */}
    </Router>
  );
}
