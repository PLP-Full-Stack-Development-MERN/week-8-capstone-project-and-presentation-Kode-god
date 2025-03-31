import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../config/axios.js';

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`https://social-media-platform-9q09.onrender.com/api/users/profile/${id}`);
      setProfile(data);
    } catch (error) {
      toast.error('Error fetching profile');
    }
  };

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`https://social-media-platform-9q09.onrender.com/api/posts/user/${id}`);
      setPosts(data);
    } catch (error) {
      toast.error('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      await axios.put(`https://social-media-platform-9q09.onrender.com/api/users/${id}/follow`);
      fetchProfile();
      toast.success(profile.followers.includes(user._id) 
        ? 'Unfollowed successfully' 
        : 'Followed successfully'
      );
    } catch (error) {
      toast.error('Error updating follow status');
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, [id]);

  if (loading || !profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={profile.profilePicture || 'https://via.placeholder.com/100'}
              alt={profile.username}
              className="w-24 h-24 rounded-full border-4 border-gray-900"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-100">{profile.username}</h1>
              <p className="text-gray-400">{profile.bio || 'No bio yet'}</p>
            </div>
          </div>
          {user && user._id !== id && (
            <button
              onClick={handleFollow}
              className={`px-6 py-2 rounded-full transition ${
                profile.followers.includes(user._id)
                  ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {profile.followers.includes(user._id) ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="flex justify-center space-x-12 mt-6 border-t border-gray-700 pt-6">
          <div className="text-center">
            <span className="block text-2xl font-bold text-gray-100">{posts.length}</span>
            <span className="text-gray-400">Tweets</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-gray-100">{profile.followers.length}</span>
            <span className="text-gray-400">Followers</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-gray-100">{profile.following.length}</span>
            <span className="text-gray-400">Following</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post._id} post={post} onUpdate={fetchPosts} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
