import { useAuth } from '../context/AuthContext';
import CommentSection from './CommentSection';
import { Favorite, Comment, Share } from '@mui/icons-material';
import axios from 'axios';

export default function PostList({ posts = [], onUpdate }) {
  const { user } = useAuth();

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onUpdate?.();
    } catch (error) {
      console.error('Error liking post:', error.response?.data?.error);
    }
  };

  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post._id} className="post-card">
          <div className="post-header">
            <img 
              src={post.user?.profilePicture || '/default-avatar.png'} 
              className="profile-pic" 
              alt="Profile" 
            />
            <div>
              <span className="post-username">{post.user?.username || 'Unknown User'}</span>
              <span className="post-time">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
          <p className="post-content">{post.content}</p>
          
          <div className="post-actions">
            <button onClick={() => handleLike(post._id)} className="icon-button">
              <Favorite style={{ 
                color: post.likes?.includes(user?._id) ? '#FF0000' : 'inherit' 
              }} />
              {post.likes?.length || 0}
            </button>
            <button className="icon-button">
              <Comment /> {post.comments?.length || 0}
            </button>
            <button className="icon-button">
              <Share />
            </button>
          </div>

          <CommentSection post={post} onUpdate={onUpdate} />
        </div>
      ))}
    </div>
  );
}