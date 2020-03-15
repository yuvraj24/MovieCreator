import React, { useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"; 
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Colors } from "../utils/colors";

const SnackBarComp = ({ isShowMessage, messageInfo, changeMsgStatus }) => {
  const [open, setOpen] = React.useState(isShowMessage);

  useEffect(() => {
    setOpen(isShowMessage)
  }, [isShowMessage])

  // const processQueue = () => {
  //   if (queueRef.current.length > 0) {
  //     setOpen(true);
  //   }
  // };

  // const handleClick = message => () => {
  //   queueRef.current.push({
  //     message,
  //     key: new Date().getTime()
  //   });

  //   if (open) {
  //     // immediately begin dismissing current message
  //     // to start showing new one
  //     setOpen(false);
  //   } else {
  //     processQueue();
  //   }
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false); 
    changeMsgStatus()
  };

  // const handleExited = () => {
  //   processQueue();
  // };

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
        horizontal: "right"
      }}
      color={Colors.app_bg_color}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      message={messageInfo ? messageInfo : undefined}
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
