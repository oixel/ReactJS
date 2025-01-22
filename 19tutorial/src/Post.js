import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    return (
        <article className="post">
            <Link to={`/post/${post.id}`}>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
            </Link>
            <p className="postBody">{
                (post.body).length <= 25
                    ? post.body  // If post is less than 25 chars, display it fully
                    : `${(post.body).slice(0, 25)}...` // Otherwise, only display first 25 characters of post with ...
            }</p>
        </article>
    )
}

export default Post