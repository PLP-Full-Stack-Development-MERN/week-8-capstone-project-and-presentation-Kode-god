import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function CommentSection({ post, onUpdate }) {
  const [commentContent, setCommentContent] = useState('');
  const { user } = useAuth();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/posts/${post._id}/comment`, { content: commentContent }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCommentContent('');
      onUpdate();
    } catch (error) {
      console.error('Error adding comment:', error.response?.data?.error);
    }
  };

  return (
    <div className="comments">
      {post.comments?.map(comment => (
        <div key={comment._id} className="comment">
          <div className="post-header">
            <img 
              src={comment.user?.profilePicture || '/default-avatar.png'} 
              className="profile-pic" 
              alt="Profile" 
              style={{ width: '32px', height: '32px' }}
            />
            <div>
              <span className="post-username">{comment.user?.username}</span>
              <span className="post-time">
                {new Date(comment.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
          <p className="post-content">{comment.content}</p>
        </div>
      ))}

      {user && (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <img 
            src={user.profilePicture || '/default-avatar.png'} 
            className="profile-pic" 
            alt="Profile" 
            style={{ width: '32px', height: '32px' }}
          />
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Write a comment..."
            required
            className="comment-textarea"
          />
          <button type="submit" className="icon-button">
            Post
          </button>
        </form>
      )}
    </div>
  );
}