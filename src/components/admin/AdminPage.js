import React, { useEffect, useState } from "react";

import { Alert, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { useMessages } from "../../context/MessageContext";
import { createMessage, getAllActors } from "../../services/APIUtils";

import "./AdminPage.scss";

const CreateMessageSchema = Yup.object().shape({
  message: Yup.string().required("Enter the message"),
  actorId: Yup.string().required("Enter the actor ID"),
});

const notify = () => toast.success("Message successfully created");

const AdminPage = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setAllMessages, setUnreadMessages } = useMessages();

  const fetchActors = async () => {
    const res = await getAllActors();
    const data = res.data;
    setActors(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchActors();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details below to create a new message
          </DialogContentText>
          <Formik
            initialValues={{
              message: "",
              actorId: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              const createMessageRequest = async () => {
                setError(false);
                setSubmitting(true);
                try {
                  const res = await createMessage(values);
                  if (res.status === 201) {
                    notify();
                  }
                  setAllMessages(res.data.allMessages);
                  setUnreadMessages(res.data.unreadMessages);
                  setSubmitting(false);
                  setOpen(false);
                } catch (err) {
                  setError(true);
                  setSubmitting(false);
                }
              };
              createMessageRequest();
            }}
            validationSchema={CreateMessageSchema}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Box margin={2}>
                  <Field
                    component={TextField}
                    type="text"
                    label="Message"
                    name="message"
                    margin="dense"
                    variant="outlined"
                  />
                </Box>
                <Box margin={2}>
                  {loading ? (
                    "LOADING"
                  ) : (
                    <Field as="select" name="actorId">
                      {actors?.map((actor) => (
                        <option name="actorId" value={actor.id}>
                          {actor.id}
                        </option>
                      ))}
                    </Field>
                  )}
                </Box>
                {error && (
                  <div className="error-div">
                    <Alert
                      severity="error"
                      style={{ textAlign: "center" }}
                    >{`Enter a valid email`}</Alert>
                  </div>
                )}
                <br />
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    color="success"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    startIcon={
                      isSubmitting ? <CircularProgress size="1rem" /> : null
                    }
                  >
                    Register
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <h2 className="dashboard-header">THE ADMIN DASHBOARD</h2>
        </CardContent>
        <CardActions>
          <Stack display="flex" flexDirection="column">
            <div className="create-msg__btn">
              <Button
                variant="contained"
                color="success"
                onClick={() => handleOpen()}
              >
                Create a new message
              </Button>
            </div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="backto-main__btn">
                <Button variant="outlined" color="success">
                  Back to main page
                </Button>
              </div>
            </Link>
          </Stack>
        </CardActions>
      </Card>
      <Toaster />
    </div>
  );
};

export default AdminPage;
