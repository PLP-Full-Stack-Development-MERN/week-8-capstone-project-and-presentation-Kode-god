import { useState } from 'react';
import axios from 'axios';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaImage } from 'react-icons/fa';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const { socket } = useSocket();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/posts', {
        content,
        image,
      });
      
      setContent('');
      setImage('');
      onPostCreated(data);
      
      if (socket && user.followers.length > 0) {
        socket.emit('newPost', user.followers);
      }
      
      toast.success('Post created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating post');
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="w-full bg-gray-800 text-gray-100 p-2 border-b border-gray-700 focus:outline-none focus:border-blue-500 resize-none mb-4"
          rows="3"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
                className="bg-gray-800 text-gray-100 p-2 pl-8 rounded-full border border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
              />
              <FaImage className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200 disabled:opacity-50"
            disabled={!content.trim()}
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;