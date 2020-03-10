import React from "react";
import { Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const SnackBarComp = ({ isShowMessage, messageInfo, changeMsgStatus }) => {
  const queueRef = React.useRef([]);
  const [open, setOpen] = React.useState(isShowMessage);

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setOpen(true);
    }
  };

  const handleClick = message => () => {
    queueRef.current.push({
      message,
      key: new Date().getTime()
    });

    if (open) {
      // immediately begin dismissing current message
      // to start showing new one
      setOpen(false);
    } else {
      processQueue();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    isShowMessage = false
  };

  const handleExited = () => {
    processQueue();
  };

  const useStyles = makeStyles(theme => ({
    close: {
      padding: theme.spacing(0.5)
    }
  }));

  const classes = useStyles();

  return (
    <Snackbar
      key={"key"}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      message={messageInfo ? messageInfo.message : undefined}
      action={
        <React.Fragment>
          <IconButton
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};
export default SnackBarComp;
