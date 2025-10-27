/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { AuthContext } from "./Context";
import axios from 'axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

 
const backendURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendURL;

export const AuthProvider = ({children}) => {

    const [accessToken, setaccessToken] = useState(Cookies.get("accessToken"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    // Check if the user authenticated, if so set the user data and connect the data
    const checkAuth = async () => {
        try {
            const res = await axios.get('/auth/check');
            if (res.data.success) {
                setAuthUser(res.data);
                socketConnect(res.data);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const socketConnect = (userData) => {
        if(!userData || socket?.connected) return;
        const newSocket = io(backendURL, {
            query: {
                userId: userData?._id
            }
        });

        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds) => {
            setOnlineUsers(userIds);
        })

    }

    // Login function to handle user authentication and socket connection
    const login = async (state, credential) => {
        try {
            const res = await axios.post(`/auth/${state}`, credential);
            if(res.data.success) {
                toast.success(res.data.message)
                window.location.href = '/';
            }else {
                 toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const logout = () => {
        Cookies.remove('refreshToken');
        Cookies.remove('accessToken');
        setaccessToken(null);
        setAuthUser(null);
        setOnlineUsers([])
        axios.defaults.headers.common["Authorization"] = null;   
        toast.success("Logged Out successfully");

        if (socket?.connected) {
            socket.disconnect();
        }

    }

    const updateProfile = async (body) => {
        try {
            const res = await axios.patch('/user', body, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if(res.data.success) {
                toast.success(res.data.message);
            }else{
                toast.error(res.data.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    // Call Authenticated Users When page loaded
    useEffect(() => {
        if(accessToken) {
            axios.defaults.headers.common["Authorization"] = accessToken;
            checkAuth();
        }
        
    }, []);

    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}