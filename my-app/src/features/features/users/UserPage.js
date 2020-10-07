import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectUserById } from '../users/usersSlice';


export const UserPage = ({match})=>{

const {userId}  = match.params;
const user = useSelector((state)=> selectUserById(state,userId));


return (
<section>{user.name}</section>
    
    );

}


