import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function PostForm({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:5000/api/posts', { content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setContent('');
      onPostCreated();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="post-form">
      <img 
        src={user.profilePicture || '/default-avatar.png'} 
        alt="Profile" 
        className="profile-pic" 
      />
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading || !content.trim()}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
}