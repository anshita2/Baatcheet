import React, { useEffect } from 'react'
import SendInput from './sendinput'
import Messages from './messages';
import { useSelector,useDispatch } from "react-redux";
import { setSelectedUser } from '../redux/userslice';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);
   
    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='md:min-w-[550px] flex flex-col w-full'>
                        <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 rounded-full'>
                                    <img src={selectedUser?.profilepic} alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>{selectedUser?.fullname}</p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className=' w-full md:min-w-[550px] flex flex-col justify-center items-center'>
                        <h1 className='text-xl sm:text-2xl md:text-4xl text-white font-bold '>Hi,{authUser?.fullname} </h1>
                        <h1 className='text-base sm:text-xl md:text-2xl text-white'>Let's start convo</h1>

                    </div>
                )
            }
        </>

    )
}

export default MessageContainer