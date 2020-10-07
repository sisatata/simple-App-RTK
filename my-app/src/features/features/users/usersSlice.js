import{
createSlice,
createAsyncThunk,
createEntityAdapter

}  from '@reduxjs/toolkit';

import {client}  from '../../../api/client';

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();
// call api
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users')
    return response.users;
  });
// creating slice
const usersSlice = createSlice({

    name : 'users',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchUsers.fulfilled] : usersAdapter.setAll,

    },
});

export default usersSlice.reducer;
// usersAdapter.getSelectors  function auto call 'selectAll' and 'selectById' selector, here we just renamed these
export const{   
selectAll: selectAllUsers,
selectById:selectUserById

}  = usersAdapter.getSelectors((state)=> state.users);


