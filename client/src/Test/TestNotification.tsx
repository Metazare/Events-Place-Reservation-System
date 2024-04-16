import React,{useState, useEffect} from 'react'

import useNotif from '../Hooks/useNotif';

export default function TestNotification({socket}) {
    
    const { notifications, loading, error, sendNotification, getNotification, readNotification } = useNotif();

    useEffect(() => {
        // Connect to the socket.io server
        socket.connect();

        if(!notifications){
            getNotification()
        }

        // Listen for 'notification' events
        socket.on('notification', (data) => {
            getNotification()
        });

        console.log(notifications);

        // Clean up the socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, []); // Run only once on component mount'

    return (
        <div>
            
        </div>
    );
}
