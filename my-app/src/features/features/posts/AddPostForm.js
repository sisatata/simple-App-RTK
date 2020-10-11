import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

export const AddPostFrom = () =>{

const  [title, setTitle] = useState('');
const  [content, setContent]  = useState('');
const  [userId, setUserId]  = useState('');
const  [addRequestStatus, setAddRequestStatus] = useState('idle');

const dispatch = useDispatch();
const users = useSelector(selectAllUsers);

const onTitleChanged = (e) => setTitle(e.target.vlaue);
const onContentChanged = (e) => setContent(e.target.vlaue);
const onAuthorChanged = (e) => setUserId(e.target.vlaue);

const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

const onPostSavedClicked = async =>{
  if(canSave){
  try{
    setAddRequestStatus('pending');
    const resultAction = await dispatch(addNewPost({title, content , user: userId}));
    unwrapResult(resultAction);
    setTitle('');
    setContent('');
    setUserId('');

  }catch(err){
      console.log('error', err);
  }finally{
      setAddRequestStatus('idle');
  }
    


  }

}
const userOptions = users.map((user)=>{
   <option   key={user.id}  value={user.id}>{user.name}</option>
});

return(
<section>
<h2>Add New Post:</h2>
<form>
  <label  htmlFor="postTitle">Post Title: </label>
  <input
   type="text"
   name="postTitle"
   id="postTitle"
   placeholder="What's on your mind!"
   value={title}
   onChange={onTitleChanged}

  />
  <label  htmlFor="postAuthor">Post Title: </label>
  <select id="postAuthor"  value={userId}  onChange={onAuthorChanged}>
    <option  value="">
      {userOptions}
    </option>
  </select>
  <label htmlFor="postContent">Content:</label>
  <textarea id="postContent"
    name="postContent"
    vlaue={content}
    onChange={onTitleChanged}
  />
<button  type="button"  onClick={onPostSavedClicked}  disabled={!canSave}>
 Save Post 
</button>
 
</form>

</section>

)

}