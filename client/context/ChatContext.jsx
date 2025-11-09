/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AuthContext, ChatContext } from "./Context";
import toast from "react-hot-toast";
import { api } from "../src/constant/constant";
import { getAccessToken } from "../src/lib/utils";

export const ChatProvider = ({ children }) => {
  const [message, setMessage] = useState([]);
  const [isFocused, setIsFocused] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessage, setUnseenMessage] = useState({});

  const { socket } = useContext(AuthContext);

  window.onfocus = () => setIsFocused(true);
  window.onblur = () => setIsFocused(false);

  // Get all users
  const getUsers = async () => {
    try {
      const res = await api.get("/user/get_all_users", {
        headers: {
          Authorization: getAccessToken(),
        },
      });

      setUsers(res.data?.data?.users);
      setUnseenMessage(res.data?.data?.unseenMessage);
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  };

  // Get selected user's message
  const getMessages = async (userId) => {
    try {
      const res = await api.get(`/message/${userId}`);

      if (res.data?.success) {
        setMessage(res.data?.data);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  };

  // Subscribe to message for selected user
  const subscribeToMessages = async () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.sender_id === selectedUser._id) {
        newMessage.seen = true;
        setMessage((prevMessages) => [...prevMessages, newMessage]);
        api.patch(`/mark/${newMessage._id}`);

        if (!isFocused && Notification.permission === "granted") {
          new Notification("New message", {
            body: newMessage.text,
            icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkEXlY3hKx-TKKpPDNpcXz6niAHgCSpRGevA&s",
          });
        }
      } else {
        setUnseenMessage((prevUnseenMessage) => ({
          ...prevUnseenMessage,
          [newMessage.sender_id]: prevUnseenMessage[newMessage.sender_id]
            ? prevUnseenMessage[newMessage.sender_id] + 1
            : 1,
        }));
      }
    });
  };

  // Unsubscribe from messages
  const unsubscribeFromMessages = () => {
    if (socket) socket.off("newMessage");
  };

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser]);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);


  // Send message to selected user
  const sendMessage = async (messageData) => {
    try {
      const res = await api.post(
        `/message/send/${selectedUser._id}`,
        messageData,
        {
          headers: {
            Authorization: getAccessToken(),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data?.success) {
        setMessage((prevMessage) => [...prevMessage, res.data.data]);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  };

  const loadSelectedMessage = async () => {
    try {
      const res = await api.get(`/message/${selectedUser._id}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      });

      setMessage(res.data.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  const value = {
    getUsers,
    users,
    getMessages,
    message,
    selectedUser,
    setMessage,
    sendMessage,
    setSelectedUser,
    unseenMessage,
    setUnseenMessage,
    loadSelectedMessage,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
