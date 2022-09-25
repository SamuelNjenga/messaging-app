import React from "react";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

import "./AdminPage.scss";
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <h2 className="dashboard-header">THE ADMIN DASHBOARD</h2>
        </CardContent>
        <CardActions>
          <Stack display="flex" flexDirection="column">
            <div className="create-msg__btn">
              <Button variant="contained" color="success">
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
    </div>
  );
};

export default AdminPage;
