import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { FaHeart, FaRegHeart, FaComment, FaRetweet } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { toast } from 'react-toastify';

const Post = ({ post, onUpdate }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const { user } = useAuth();
  const { socket } = useSocket();

  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}/like`);
      
      if (!post.likes.includes(user._id) && socket) {
        socket.emit('newLike', post.user._id);
      }
      
      onUpdate();
    } catch (error) {
      toast.error('Error liking post');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/posts/${post._id}/comments`, {
        content: commentContent,
      });
      
      if (socket) {
        socket.emit('newComment', post.user._id);
      }
      
      setCommentContent('');
      onUpdate();
      toast.success('Comment added successfully!');
    } catch (error) {
      toast.error('Error adding comment');
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 mb-4 hover:bg-gray-750 transition">
      <div className="flex items-start space-x-3">
        <img
          src={post.user.profilePicture || 'https://via.placeholder.com/40'}
          alt={post.user.username}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <Link
              to={`/profile/${post.user._id}`}
              className="font-bold text-gray-100 hover:underline"
            >
              {post.user.username}
            </Link>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 text-sm">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>

          <p className="text-gray-100 mt-2">{post.content}</p>
          {post.image && (
            <img
              src={post.image}
              alt="Post content"
              className="mt-3 rounded-xl max-h-96 w-full object-cover"
            />
          )}

          <div className="flex items-center justify-between mt-4 text-gray-500">
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 group"
            >
              <div className="p-2 rounded-full group-hover:bg-blue-500/20 group-hover:text-blue-500 transition">
                <FaComment />
              </div>
              <span>{post.comments.length}</span>
            </button>

            <button className="flex items-center space-x-2 group">
              <div className="p-2 rounded-full group-hover:bg-green-500/20 group-hover:text-green-500 transition">
                <FaRetweet />
              </div>
              <span>0</span>
            </button>

            <button
              onClick={handleLike}
              className="flex items-center space-x-2 group"
            >
              <div className={`p-2 rounded-full ${
                post.likes.includes(user._id)
                  ? 'text-red-500'
                  : 'group-hover:bg-red-500/20 group-hover:text-red-500'
              } transition`}>
                {post.likes.includes(user._id) ? <FaHeart /> : <FaRegHeart />}
              </div>
              <span>{post.likes.length}</span>
            </button>
          </div>

          {showComments && (
            <div className="mt-4 border-t border-gray-700 pt-4">
              <form onSubmit={handleComment} className="mb-4">
                <input
                  type="text"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Tweet your reply"
                  className="w-full bg-gray-800 text-gray-100 p-2 rounded-full border border-gray-700 focus:outline-none focus:border-blue-500"
                />
              </form>

              <div className="space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment._id} className="flex items-start space-x-3">
                    <img
                      src={comment.user.profilePicture || 'https://via.placeholder.com/32'}
                      alt={comment.user.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/profile/${comment.user._id}`}
                          className="font-bold text-gray-100 hover:underline"
                        >
                          {comment.user.username}
                        </Link>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-500 text-sm">
                          {moment(comment.createdAt).fromNow()}
                        </span>
                      </div>
                      <p className="text-gray-100 mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;