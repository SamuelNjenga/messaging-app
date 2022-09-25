import React from "react";

import { useMessages } from "../context/MessageContext";

import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import "./Home.scss";

const Home = (props) => {
  const { unreadMessages, unreadLoading } = useMessages();

  return (
    <div>
      <h1 style={{ width: "20%" }}>{props.name || <Skeleton />}</h1>
      <Link to="messages" style={{ textDecoration: "none" }}>
        <Badge
          badgeContent={
            unreadLoading ? <Skeleton count={2} /> : unreadMessages.length
          }
          color="secondary"
        >
          New Messages <MailIcon color="action" />
        </Badge>
      </Link>
      <br />
      <Link to="admin" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="success">
          Go to admin section
        </Button>
      </Link>
    </div>
  );
};

export default Home;
