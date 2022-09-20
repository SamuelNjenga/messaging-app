import React, { createContext, useState, useContext, useEffect } from "react";

import { getAllMessages, getUnreadMessages } from "../services/APIUtils";

export const MessageContext = createContext();

export function useMessages() {
  return useContext(MessageContext);
}

export const MessageProvider = (props) => {
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [unreadLoading, setUnreadLoading] = useState(true);
  const [allMessages, setAllMessages] = useState([]);
  const [allMessagesLoading, setAllMessagesLoading] = useState(true);

  const fetchUnreadMessages = async () => {
    const res = await getUnreadMessages();
    const data = res.data;
    setUnreadMessages(data);
    setUnreadLoading(false);
  };

  useEffect(() => {
    fetchUnreadMessages();
  }, []);

  const fetchAllMessages = async () => {
    const res = await getAllMessages();
    const data = res.data;
    setAllMessages(data);
    setAllMessagesLoading(false);
  };

  useEffect(() => {
    fetchAllMessages();
  }, []);

  return (
    <MessageContext.Provider
      value={{
        unreadMessages,
        setUnreadMessages,
        unreadLoading,
        setUnreadLoading,
        allMessages,
        setAllMessages,
        setAllMessagesLoading,
        allMessagesLoading,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};
