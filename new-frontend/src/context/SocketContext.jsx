import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const newSocket = io(import.meta.env.VITE_API_URL);
      setSocket(newSocket);

      newSocket.emit('join', user._id);

      newSocket.on('newPostNotification', () => {
        toast.info('New post from someone you follow!');
      });

      newSocket.on('newLikeNotification', () => {
        toast.success('Someone liked your post!');
      });

      newSocket.on('newCommentNotification', () => {
        toast.success('Someone commented on your post!');
      });

      return () => newSocket.close();
    }
  }, [user]);

  const value = {
    socket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
