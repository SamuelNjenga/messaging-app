import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import moment from "moment";

import { convertToRead, deleteMessage } from "../../services/APIUtils";
import { useMessages } from "../../context/MessageContext";

import "react-loading-skeleton/dist/skeleton.css";
import "./Messages.scss";

const Messages = () => {
  const [open, setOpen] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const [message, setMessage] = useState({});

  const {
    allMessages,
    allMessagesLoading,
    setAllMessages,
    setUnreadMessages,
  } = useMessages();

  const handleClickOpen = (msgId) => {
    setMessageId(msgId);
    const result = allMessages.find(({ id }) => id === msgId);
    setMessage(result);
    setOpen(true);
  };

  const handleClose = async (msgId, actorId) => {
    try {
      const res = await convertToRead({
        messageId: msgId,
        actorId: actorId,
      });
      setAllMessages(res.data.allMessages);
      setUnreadMessages(res.data.unreadMessages);
    } catch (err) {
      console.log(err);
    }
    setOpen(false);
  };

  const handleMessageDelete = async (msgId, actorId) => {
    try {
      const res = await deleteMessage({
        messageId: msgId,
        actorId: actorId,
      });

      setAllMessages(res.data.allMessages);
      setUnreadMessages(res.data.unreadMessages);
    } catch (err) {
      console.log(err);
    }
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
          <Button
            onClick={() => handleClose(message.id, message.actorId)}
            variant="outlined"
            color="secondary"
          >
            Close
          </Button>
          <Button
            onClick={() => handleClose(message.id, message.actorId)}
            variant="contained"
            color="success"
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      <h4>Your messages</h4>
      {allMessagesLoading ? (
        <Skeleton />
      ) : (
        allMessages.map((message) => (
          <>
            <Card variant="outlined">
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                style={{ fontWeight: message.read ? "" : "bold" }}
                className="box"
              >
                <div
                  key={message.id}
                  onClick={() => handleClickOpen(message.id)}
                  style={{ cursor: "pointer" }}
                  className="message-list"
                >
                  <StarBorderIcon color="action" />
                  <span>Message ID : {message.id}</span>
                  <span>Message : {message.message}</span>
                </div>
                <div className="delete-icon">
                  <IconButton
                    onClick={() =>
                      handleMessageDelete(message.id, message.actorId)
                    }
                  >
                    <DeleteIcon color="success" />
                  </IconButton>
                </div>
              </Stack>
              <br />
            </Card>
          </>
        ))
      )}
      <Link to="/">
        <Button variant="contained" color="success">
          BACK
        </Button>
      </Link>
    </div>
  );
};

export default Messages;
