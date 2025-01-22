import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import EditPost from './EditPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

// Import our own posts API
import api from './api/posts';

function App() {
  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const navigate = useNavigate();

  // Empty array to only call useEffect on load time
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('./posts');

        // Don't have to check if response or if response.data thanks to axios
        // axios throws error for anything outside the 200 range
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }
        else {  // In case of undefined error, just display the error
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, []);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? Number(posts[posts.length - 1].id) + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id: id.toString(), title: postTitle, datetime, body: postBody };

    try {
      // Use axios to post the new post data
      const response = await api.post('/posts', newPost);

      // Create a array containing all previous posts + new post
      const allPosts = [...posts, response.data];

      // Update posts to contain new post
      setPosts(allPosts);

      // Update title and body to be empty
      setPostTitle('');
      setPostBody('');

      // Navigate back to homepage to see new post!
      navigate('/');
    } catch (err) {  // Throw error if failure occurs for any reason
      console.log(`Error: ${err.message}`);
    }
  }

  // Allows the editing of pre-existing posts!
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);

      // Only for when the post IDs match, will we pass in the new data
      // This means that only the edited post will get editted
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));

      setEditTitle('');
      setEditBody('');

      // Head back to home page when edit is complete!
      navigate('/')
    } catch (err) { // Throw error if failure occurs for any reason
      console.log(`Error: ${err.message}`);
    }
  }

  // Delete current post by removing it from posts lists and going back to homepage!
  const handleDelete = async (id) => {
    try {
      // Use axios to handle deleting from data!
      await api.delete(`/posts/${id}`);

      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      navigate('/');  // Navigate back to homepage
    } catch (err) { // Throw error if failure occurs for any reason
      console.log(`Error: ${err.message}`);
    }
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
        <Route path="/edit/:id" element={
          <EditPost
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
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
