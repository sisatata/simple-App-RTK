import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { selectPostById } from './postsSlice';

export const SinglePagePost = ({match})=>{
const {postId}   = match.params;
const post = useSelector((state)=> selectPostById(state,postId) );
if(!post){
    return(
        <section>

            <h2>Post Not Found</h2>
        </section>
    )
}

return(
    <section>
    <article>
<h2  className="post">{post.title}</h2>
    <div>
        <PostAuhtor userId = {post.user}/>
        <TimeAgo    timestamp ={post.date} />

    </div>
<p className="post-content">{post.content}</p>
<Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
    </article>
    <div>

    </div>
</section>

)



};