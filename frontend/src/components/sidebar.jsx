import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './otherusers';
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser,setAllUsers,setOnlineUsers} from '../redux/userslice';
import { setMessages } from '../redux/messageslice';
import { BASE_URL } from '../config'; 
import { useEffect } from 'react';
import useGetOtherUsers from "../hooks/usegetotherusers";

const Sidebar = () => {
    useGetOtherUsers();
    const [search, setSearch] = useState("");
    const { otherUsers, allUsers } = useSelector(store => store.user);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Show all users initially
    useEffect(() => {
        setFilteredUsers(otherUsers || []);
    }, [otherUsers]);

    // Update filtered users when search changes
    useEffect(() => {
        if (search.trim() === "") {
            setFilteredUsers(otherUsers || []);
        } else {
            const filtered = allUsers?.filter(user =>
                user.fullname.toLowerCase().includes(search.toLowerCase())
            );
            console.log("allUsers", allUsers);

            console.log("filtered users",filtered);
            setFilteredUsers(filtered || []);
        }
    }, [search, allUsers, otherUsers]);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/auth/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setAllUsers(null));
            dispatch(setSelectedUser(null));
            dispatch(setOnlineUsers(null));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='input input-bordered rounded-md'
                    type="text"
                    placeholder='Search...'
                />
            </form>
            <div className="divider px-3"></div>
            <OtherUsers users={filteredUsers} /> {/* ✅ Pass filtered list */}
            <div className='mt-2'>
                <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
            </div>
        </div>
    );
};


export default Sidebar