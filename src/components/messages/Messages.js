import React, { useState } from "react";

import { useMessages } from "../../context/MessageContext";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Skeleton from "react-loading-skeleton";
import moment from "moment";

import "react-loading-skeleton/dist/skeleton.css";
import "./Messages.scss";

const Messages = () => {
  const [open, setOpen] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const [message, setMessage] = useState({});

  const { allMessages, allMessagesLoading } = useMessages();

  const handleClickOpen = (msgId) => {
    setMessageId(msgId);
    const result = allMessages.find(({ id }) => id === msgId);
    setMessage(result);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <span class="message-header">{"The message"}</span>{" "}
          <span class="message-time">
            {moment(message.createdAt).format("lll")}
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message.message} {message.id}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      <h4>Your messages</h4>
      {allMessagesLoading ? (
        <Skeleton />
      ) : (
        allMessages.map((message) => (
          <div
            key={message.id}
            onClick={() => handleClickOpen(message.id)}
            style={{ cursor: "pointer" }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <StarBorderIcon color="action" />
              <span>Message ID : {message.id}</span>
              <span>Message : {message.message}</span>
            </Stack>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
