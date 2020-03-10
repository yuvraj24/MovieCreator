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
import { TextField, Snackbar } from "@material-ui/core";
import apis from "../api/api";
import SnackBarComp from "../components/SnackBarComp";

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

export default function MovieInsert({ isOpen, handleCloseClick }) {
  const [open, setOpen] = React.useState(isOpen);
  const [isShowMessage, setShowMessage] = React.useState(false);
  const [ApiMessage, setApiMessage] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    handleCloseClick();
  };

  const handleSave = () => {
    let movie = {
      name: "",
      description: "",
      time: "",
      rating: "",
      location: ""
    };

    apis
      .insertMovie(movie)
      .then(res => {
        console.log("Insert Response : " + JSON.stringify(res));
        setShowMessage(true);
        setApiMessage(res);
        setOpen(false);
        handleCloseClick();
      })
      .catch(err => {
        console.log("Insert Error Response : " + JSON.stringify(err));
        setShowMessage(true);
        setApiMessage(err);
      });
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
          Create Movie
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
                // helperText="Incorrect entry."
                variant="standard"
                fullWidth
                style={{ fontSize: 20, width: "100%" }}
              />

              <TextField
                error={false}
                id="standard-error-helper-text"
                label="Movie Description"
                // helperText="Incorrect entry."
                // variant="standard"
                multiline
                // rowsMax="4"
                // value={'value'}
                // onChange={'handleChange'}
                variant="standard"
                style={{ fontSize: 20, width: "100%", marginTop: "5%" }}
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
                  variant="standard"
                  fullWidth
                  style={{ fontSize: 20, width: "45%", marginTop: "5%" }}
                />

                <TextField
                  error={false}
                  id="standard-error-helper-text"
                  label="Rating"
                  // helperText="Incorrect entry."
                  variant="standard"
                  fullWidth
                  style={{
                    fontSize: 20,
                    width: "45%",
                    marginTop: "5%",
                    marginLeft: "10%"
                  }}
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
        isShowMessage={isShowMessage}
        messageInfo={ApiMessage}
        changeMsgStatus={() => setShowMessage(false)}
      />
    </div>
  );
}
