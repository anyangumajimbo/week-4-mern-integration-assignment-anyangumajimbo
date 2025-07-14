import { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    category: '',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch categories on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(res => {
        setCategories(res.data.data);
      })
      .catch(err => {
        console.error('Failed to fetch categories:', err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        author: '6873d84b73fbcf592ef3c40a' // TEMPORARY: use real user _id later
      };

      const res = await axios.post('http://localhost:5000/api/posts', payload);
      setMessage('✅ Post created successfully!');
      setFormData({ title: '', content: '', tags: '', category: '' });
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create New Blog Post</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border p-2 w-full"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          className="border p-2 w-full"
          rows={6}
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          className="border p-2 w-full"
          value={formData.tags}
          onChange={handleChange}
        />
        <select
          name="category"
          className="border p-2 w-full"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
