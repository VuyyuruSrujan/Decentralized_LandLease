import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import '../styles/PostLand.css';

const PostLand = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    area: '',
    leaseTerm: '',
    price: '',
    description: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Land posted successfully!');
    // Handle form submission logic here
  };

  return (
    <motion.div 
      className="post-land"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Post Your Land for Lease</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input 
            type="text" 
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Area (acres)</label>
            <input 
              type="number" 
              value={formData.area}
              onChange={(e) => setFormData({...formData, area: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Lease Term (years)</label>
            <input 
              type="number" 
              value={formData.leaseTerm}
              onChange={(e) => setFormData({...formData, leaseTerm: e.target.value})}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Price (₹/year)</label>
          <input 
            type="number" 
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input 
            type="url" 
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Post Land</button>
      </form>
    </motion.div>
  );
};

export default PostLand;