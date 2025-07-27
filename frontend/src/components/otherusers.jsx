import React from 'react'
import OtherUser from './otheruser';
import useGetOtherUsers from '../hooks/usegetotherusers';
import {useSelector} from "react-redux";


const OtherUsers = ({ users }) => {
    return (
        <div className='overflow-auto flex-1'>
            {users.map((user) => (
                <OtherUser key={user._id} user={user} />
            ))}
        </div>
    );
};

export default OtherUsers;
