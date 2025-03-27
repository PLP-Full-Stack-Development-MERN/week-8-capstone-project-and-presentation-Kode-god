import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostList from '../components/PostList';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/users/${id}`);
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data?.error);
      }
    };
    fetchProfile();
  }, [id]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile">
      <h1>{profile.username}</h1>
      <h3>{profile.posts?.length || 0} Posts</h3>
      <PostList posts={profile.posts || []} />
    </div>
  );
}
