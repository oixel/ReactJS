import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({
    posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle
}) => {
    // Grab id from request
    const { id } = useParams();

    // Find desired post to edit
    const post = posts.find(post => (post.id).toString() === id);

    // Called when loaded and passes in necessary data (post and functions)
    useEffect(() => {
        // If post exists, set the edit values
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

    return (

        <main className="NewPost">
            {
                // If edit title exists (if post exists, display content to edit)
                editTitle && <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => { e.preventDefault() }}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {/* Otherwise, if desired post does not exist, display error message */}
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost