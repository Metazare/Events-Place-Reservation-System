import React, {useState} from 'react'
import axios from './useAxios'
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

interface Data {
  notifications: any;
  loading: boolean;
  error: Error | null;
  sendNotification: (data: SendNotificationData) => void;
  getNotification: () => void;
  readNotification: (data: ReadNotificationData) => void;
}

interface SendNotificationData {
  userId: string;
  type: string;
  content: string;
}

interface ReadNotificationData {
  notificationId: string;
}

function useNotif(): Data {
  const [notifications, setNotifications] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const sendNotification = (data: SendNotificationData) => {
    const notificationData = {
      userId: data.userId,
      type: data.type,
      content: data.content,
    };

    // Emit a 'notification' event to the server
    socket.emit('notification', notificationData);
  };

  const getNotification = async () => {
    setLoading(true)
    try {
      await axios
      .get('/notification')
      .then((response:any)=>{
        setNotifications(response.data.sort((a:any, b:any) => b._id.localeCompare(a._id)))
      });
    } catch (error: any) {
      setError(error)
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  const readNotification = async (data: ReadNotificationData) => {
    try {
      await axios
      .patch('/notification', {
        notificationId: data.notificationId
      })
      .then((response:any)=>{
        console.log(response.data);
      });
    } catch (error: any) {
      setError(error);
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  return {
    notifications,
    loading,
    error,
    sendNotification,
    getNotification,
    readNotification,
  }
}

export default useNotif;