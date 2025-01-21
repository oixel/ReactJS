import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "My First Post", datetime: "July 01. 2021 11:17:36 AM", body: "So satisfied, I said a lot of things tonight." },
    { id: 2, title: "MORE!", datetime: "July 12. 2021 11:17:36 AM", body: "Goodbye aphasia and the ways it kept me hiding." }

  ]);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const navigate = useNavigate();

  // Whenever posts or search gets changed, check to update searchResults
  useEffect(() => {
    // Only include post result if current search shows up in title or body of post
    const filteredResults = posts.filter(post =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    );

    // Reverse the posts to display the newest at the top
    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  // Called when a new post is submitted on Posts tab
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };

    // Create a array containing all previous posts + new post
    const allPosts = [...posts, newPost];

    // Update posts to contain new post
    setPosts(allPosts);

    // Update title and body to be empty
    setPostTitle('');
    setPostBody('');

    // Navigate back to homepage to see new post!
    navigate('/');
  }

  // Delete current post by removing it from posts lists and going back to homepage!
  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate('/');  // Navigate back to homepage
  }

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="/post" element={
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div >
  );
}

export default App;
