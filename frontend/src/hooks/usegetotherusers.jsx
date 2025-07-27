import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers,setAllUsers } from '../redux/userslice';
import { BASE_URL } from '../config';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/auth/`);
                // store
                console.log("fetched users ",res.data);
                dispatch(setOtherUsers(res.data));
                dispatch(setAllUsers(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    }, [])

}

export default useGetOtherUsers