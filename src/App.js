import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MessageProvider } from "./context/MessageContext";

import Messages from "./components/messages/Messages";
import Home from "./pages/Home";
import AdminPage from "./components/admin/AdminPage";

const App = () => {
  return (
    <div>
      <MessageProvider>
        <Router>
          <Routes>
            <Route path="/messages" element={<Messages />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/" element={<Home />} />{" "}
          </Routes>
        </Router>
      </MessageProvider>
    </div>
  );
};

export default App;
