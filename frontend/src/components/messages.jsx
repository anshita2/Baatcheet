import React from 'react'
import Message from './message'
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from "react-redux";
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessages.jsx';

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const { messages } = useSelector(store => store.message);
    
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {
               messages && messages?.map((message) => {
                    return (
                        <Message key={message._id} message={message} />
                    )
                })
            }

        </div>


    )
}

export default Messages