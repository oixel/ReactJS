import Feed from "./Feed";

const Home = ({ posts, fetchError, isLoading }) => {
    return (
        <main className="Home">
            {/* If currently loading data, display loading posts message */}
            {isLoading && <p className="statusMsg">Loading posts...</p>}

            {/* If there is a fetch error, display the error with red text! */}
            {fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}

            {/* Otherwise, display posts if posts exist OR empty message if empty posts! */}
            {!isLoading && !fetchError && (
                posts.length ?
                    <Feed posts={posts} />
                    : <p className="statusMsg">No posts to display.</p>
            )}
        </main>
    )
}

export default Home