import {
    createSlice,
    createAsyncThunk,
    createSelector,
    createEntityAdapter,
  } from '@reduxjs/toolkit';

  import {client}  from '../../../api/client';

  const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
  });

  const initialState = postsAdapter.getInitialState({
   status:'idle',
   error:null

  });

  export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.posts
  });

  export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async (initialPost) => {
      const response = await client.post('/fakeApi/posts', { post: initialPost })
      return response.post
    }
  );

const postsSlice = createSlice({
name:'posts',
initialState,
reducers:{
    postUpdated(state,action){
        const {id, title, content}  = action.payload;
       const existingPost = state.entities[id];
       if(existingPost){
           existingPost.title = title;
           existingPost.content = content;
       }
      

    },
    
},
extraReducers:{
    [fetchPosts.pending]: (state,action)=>{
        state.status ='loading';
    },
    [fetchPosts.fulfilled]:(state,action)=>{

        state.status='succeded';
    },
    [fetchPosts.rejected]:(state,action)=>{
        state.status = 'failed';
    },
[addNewPost.fulfilled]:postsAdapter.addOne,

},

});

export default postsSlice.reducer;
export const {postAdded, postUpdated}  = postsSlice.actions;

export const {  

selectAll: selectAllPosts,
selectById: selecetPostById,
selectIds: selectPostsIds

}  = postsAdapter.getSelectors((state)=> state.posts);


export const selectPostByUSer = createSelector(


    [selectAllPosts, (state, userId) => userId],
    (posts, userId)=> posts.filter((post)=> post.user===userId)
);

