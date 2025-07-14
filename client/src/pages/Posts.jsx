import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data.data);
      } catch (err) {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p>{post.content}</p>
              <div className="mt-2">
    <Link to={`/edit/${post._id}`}
      className="text-blue-600 hover:underline text-sm"
    >
      Edit
    </Link>
  </div>
              <hr className="my-2" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Posts;
