import { useEffect, useState } from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import axios from 'axios';

export default function Home() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User not authenticated. Please log in.");
      return;
    }
  
    try {
      const res = await axios.get("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data?.error || error.message);
    }
  };
    useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="home">
      <PostForm onPostCreated={fetchPosts} />
      <PostList posts={posts} onUpdate={fetchPosts} />
    </div>
  );
}
