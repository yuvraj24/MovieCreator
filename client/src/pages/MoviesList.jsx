import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";  
import { getAllMovies } from "../api/api";

import MovieCard from "../components/MovieCard";

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
  const [data, setData] = useState([])

  useEffect(() => {
    getAllMovies()
      .then((res) => {
          console.log(JSON.stringify(res))
          setData(res.data.data)
        })
      .catch((err) => {console.log(JSON.stringify(err))});
  }, []);

  return (
    <div className={classes.root} style={{backgroundColor: '#EFEFEF', height:'100%'}}>
      <GridList style={{ paddingBottom: "2%"}} >
        {/* <GridListTile key="Subheader" cols={2} style={{fontSize: 30, height: "auto" }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile> */}
        {data.map(tile => (
          <MovieCard movie={tile} />
        ))}
      </GridList>
    </div>
  );
}
