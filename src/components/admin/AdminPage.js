import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import toast, { Toaster } from "react-hot-toast";

// import ColoredLinearProgress from "../elements/ColoredLinearProgress";

import "./AdminPage.scss";
import { createMessage } from "../../services/APIUtils";

const CreateMessageSchema = Yup.object().shape({
  message: Yup.string().required("Enter the message"),
  actorId: Yup.string().required("Enter the actor ID"),
});

const notify = () => toast.success("Message successfully created");

const AdminPage = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  }

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
                  const resp = await createMessage(values);
                  if (resp.status === 201) {
                    notify();
                  }
                  setSubmitting(false);
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
                  <Field
                    component={TextField}
                    type="number"
                    label="actorId"
                    name="actorId"
                    margin="dense"
                    variant="outlined"
                  />
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
