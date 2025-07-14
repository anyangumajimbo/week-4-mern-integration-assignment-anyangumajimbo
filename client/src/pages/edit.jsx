import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch existing post and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, catRes] = await Promise.all([
          axios.get(`/api/posts/${id}`),
          axios.get("/api/categories"),
        ]);

        const post = postRes.data.data;

        setFormData({
          title: post.title,
          content: post.content,
          tags: post.tags.join(", "),
          category: post.category?._id || "",
        });

        setCategories(catRes.data.data);
      } catch (err) {
        setMessage("❌ Failed to load post or categories");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.put(`/api/posts/${id}`, {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        author: "6873d84b73fbcf592ef3c40a", // Same author as before (use token later)
      });

      setMessage("✅ Post updated!");
      setTimeout(() => navigate("/posts"), 1200);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update post");
    }
  };

  if (loading) return <p>Loading post...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Edit Blog Post</h2>
      {message && <p className="mb-2 text-sm text-red-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Content"
          rows={6}
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.content}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.tags}
          onChange={handleChange}
        />

        <select
          name="category"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
