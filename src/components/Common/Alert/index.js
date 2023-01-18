import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const Alert = ({
  continueFunc,
  closeFunc,
  title,
  details,
  firstButtonText,
  secondButtonText,
  disableSecondButton = false,
  isCropBox = false,
  secondButtonColor = null,
  crossButton = null,
}) => {
  return (
    <Dialog
      open={true}
      onClose={closeFunc}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="alert-dialog"
    >
      <DialogTitle id="alert-dialog-title">
        <Box display="inline" className="title">
          {title}
        </Box>
        {crossButton && (
          <Box
            display="inline"
            onClick={crossButton}
            style={{ float: "right", cursor: "pointer" }}
          >
            <CloseOutlined />
          </Box>
        )}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Box mt={title ? 2 : 0} mb={2} pr={isCropBox ? 0 : 2}>
            {details}
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {firstButtonText && (
          <Box mr={1} mb={1}>
            <Button onClick={closeFunc} variant="contained" color="primary">
              {firstButtonText}
            </Button>
          </Box>
        )}
        <Box mr={1} mb={1}>
          <Button
            onClick={continueFunc}
            disabled={disableSecondButton}
            variant="contained"
            color="primary"
            style={{
              backgroundColor: secondButtonColor ? secondButtonColor : "",
            }}
          >
            {secondButtonText}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
