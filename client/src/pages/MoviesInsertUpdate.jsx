import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import apis from "../api/api";
import SnackBarComp from "../components/SnackBarComp";
import { CONSTANT } from "../utils/constants";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function MovieInsert({ isOpen, movieUpdate, handleCloseClick }) {
  const [open, setOpen] = React.useState(isOpen);
  const [showMessage, setShowMessage] = React.useState({});
  const [movieRecord, setMovieRecord] = React.useState({});

  React.useEffect(() => {
    console.log(movieRecord);
    setOpen(isOpen);
    if (movieUpdate) {
      setMovieRecord(movieUpdate);
    }
  }, [isOpen]);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
    handleCloseClick();
  };

  const validateFields = () => {
    console.log("Movie Record => ", JSON.stringify(movieRecord));
    if (!movieRecord.name || movieRecord.name === "") {
      setShowMessage({ status: "true", message: "Enter Movie Name" });
      return false;
    }
    if (!movieRecord.description || movieRecord.description === "") {
      setShowMessage({ status: "true", message: "Enter Movie Description" });
      return false;
    }
    if (!movieRecord.location || movieRecord.location === "") {
      setShowMessage({ status: "true", message: "Enter Movie Location" });
      return false;
    }
    if (!movieRecord.rating || movieRecord.rating === "") {
      setShowMessage({ status: "true", message: "Enter Movie Rating" });
      return false;
    } else {
      return true;
    }
  };

  const handleSave = () => {
    if (validateFields()) {
      let movie = {
        name: movieRecord.name,
        description: movieRecord.description,
        time: new Date(),
        rating: movieRecord.rating,
        location: movieRecord.location
      };

      let mainApi = !movieUpdate
        ? apis.insertMovie(movie)
        : apis.updateMovieById(movieUpdate._id, movie);
      mainApi
        .then(res => {
          console.log("Insert Response : " + JSON.stringify(res));
          setShowMessage({
            status: true,
            message: res.data.message
          });
          setOpen(false);
          handleCloseClick();
        })
        .catch(err => {
          console.log("Insert Error Response : " + JSON.stringify(err));
          setShowMessage({ status: true, message: JSON.stringify(err) });
        });
    }
  };

  const onInputChange = (type, value) => {
    console.log(type, value.target.value);
    switch (type) {
      case CONSTANT.NAME:
        setMovieRecord({ ...movieRecord, name: value.target.value });
        break;

      case CONSTANT.DESCRIPTION:
        setMovieRecord({ ...movieRecord, description: value.target.value });
        break;

      case CONSTANT.LOCATION:
        setMovieRecord({ ...movieRecord, location: value.target.value });
        break;

      case CONSTANT.RATING:
        setMovieRecord({ ...movieRecord, rating: value.target.value });
        break;

      default:
        break;
    }
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        style={{ width: "100%" }}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          style={{ marginLeft: "2%", marginTop: "2%" }}
        >
          {movieUpdate ? "Update" : "Create"} Movie
        </DialogTitle>
        <DialogContent
          style={{ marginLeft: "2%", marginRight: "2%", marginBottom: "2%" }}
        >
          <form noValidate autoComplete="off">
            <div>
              <TextField
                error={false}
                id="standard-error-helper-text"
                label="Movie Name"
                value={movieRecord.name}
                // helperText="Incorrect entry."
                variant="standard"
                fullWidth
                style={{ fontSize: 20, width: "100%" }}
                onChange={value => onInputChange(CONSTANT.NAME, value)}
              />

              <TextField
                error={false}
                id="standard-error-helper-text"
                label="Movie Description"
                // helperText="Incorrect entry."
                // variant="standard"
                multiline
                value={movieRecord.description}
                // rowsMax="4"
                // value={'value'}
                // onChange={'handleChange'}
                variant="standard"
                style={{ fontSize: 20, width: "100%", marginTop: "5%" }}
                onChange={value => onInputChange(CONSTANT.DESCRIPTION, value)}
              />

              <div
                style={{
                  flexDirection: "row",
                  width: "100%",
                  flex: 1,
                  justifyContent: "space-between"
                }}
              >
                <TextField
                  error={false}
                  id="standard-error-helper-text"
                  label="Location"
                  // helperText="Incorrect entry."
                  value={movieRecord.location}
                  variant="standard"
                  fullWidth
                  style={{ fontSize: 20, width: "45%", marginTop: "5%" }}
                  onChange={value => onInputChange(CONSTANT.LOCATION, value)}
                />

                <TextField
                  error={false}
                  id="standard-error-helper-text"
                  label="Rating"
                  // helperText="Incorrect entry."
                  variant="standard"
                  fullWidth
                  value={movieRecord.rating}
                  style={{
                    fontSize: 20,
                    width: "45%",
                    marginTop: "5%",
                    marginLeft: "10%"
                  }}
                  onChange={value => onInputChange(CONSTANT.RATING, value)}
                />
              </div>
              {/* <Button
                variant="contained"
                color="primary"
                style={{
                  fontSize: 16,
                  marginLeft: "1%",
                  marginRight: "1%",
                  top: 90,
                  width: "100%",
                  padding: 10,
                  position: "relative"
                }}
              >
                Create
              </Button> */}
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            color="primary"
            style={{ margin: "3%", fontWeight: "bold" }}
          >
            CANCEL
          </Button>
          <Button
            autoFocus
            onClick={() => handleSave()}
            color="primary"
            style={{ margin: "3%", fontWeight: "bold" }}
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>

      <SnackBarComp
        isShowMessage={showMessage.status}
        messageInfo={showMessage.message}
        changeMsgStatus={() => setShowMessage({ status: false, message: "" })}
      />
    </div>
  );
}
