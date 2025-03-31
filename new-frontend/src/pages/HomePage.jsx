import { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../config/axios.js';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('https://social-media-platform-9q09.onrender.com/api/posts');
      setPosts(data);
    } catch (error) {
      toast.error('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {user && <CreatePost onPostCreated={handlePostCreated} />}
      <div className="space-y-6">
        {posts.map((post) => (
          <Post key={post._id} post={post} onUpdate={fetchPosts} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
