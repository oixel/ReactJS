import { useParams, Link } from "react-router-dom";

const PostPage = ({ posts, handleDelete }) => {
    // Grabs id from definition of post page in App.js (meaning the ":id")
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    return (
        <main className="PostPage">
            <article className="post">
                {/* If we have a post to display, display it */}
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <button onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {/* Otherwise, if post does not exist, display error message! */}
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage