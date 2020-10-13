import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
  } from '@reduxjs/toolkit';
  
  import { client } from '../../api/client';

  const notificationAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
  });

  export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    );
    return response.notifications;

    }


  )

  const notificationsSlice = createSlice({
      name: 'notifications',
      initialState : notificationAdapter.initialState(),
      reducers:{

        allNotificationsRead(state,action){
            state.notifications.read = true;
            Object.values(state.entities).forEach((notification) => {
                notification.read = true;
            });
        }
      },
      extraReducers:{
          [fetchNotifications.fulfilled] : (state, action)=>{
            Object.values(state.entities).forEach((notification) => {
                // Any notifications we've read are no longer new
                notification.isNew = !notification.read;
              });
              notificationsAdapter.upsertMany(state, action.payload);
          }
      }
      
  });

  export const {allNotificationsRead}  = notificationsSlice.actions;
  export default notificationsSlice.reducer;
  export const {
    selectAll: selectAllNotifications,
  } = notificationsAdapter.getState((state)=> state.notifications);