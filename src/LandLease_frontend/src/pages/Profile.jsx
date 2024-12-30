import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEdit, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import '../styles/Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('listings');
  
  const userListings = [
    {
      id: 1,
      title: "Agricultural Land",
      location: "Karnataka",
      status: "active",
      views: 245,
      inquiries: 12
    },
    {
      id: 2,
      title: "Commercial Plot",
      location: "Maharashtra",
      status: "leased",
      views: 189,
      inquiries: 8
    }
  ];

  const leaseHistory = [
    {
      id: 1,
      landTitle: "Farm Land",
      owner: "John Doe",
      startDate: "2023-01-15",
      endDate: "2025-01-15",
      status: "active"
    }
  ];

  return (
    <motion.div 
      className="profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            <FaUser />
          </div>
          <div className="profile-details">
            <h1>John Smith</h1>
            <div className="profile-meta">
              <span><FaMapMarkerAlt /> Mumbai, India</span>
              <span><FaPhone /> +91 98765 43210</span>
              <span><FaEnvelope /> john.smith@email.com</span>
            </div>
          </div>
          <button className="edit-profile-btn">
            <FaEdit /> Edit Profile
          </button>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          <button 
            className={`tab ${activeTab === 'listings' ? 'active' : ''}`}
            onClick={() => setActiveTab('listings')}
          >
            My Listings
          </button>
          <button 
            className={`tab ${activeTab === 'leases' ? 'active' : ''}`}
            onClick={() => setActiveTab('leases')}
          >
            Lease History
          </button>
          <button 
            className={`tab ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved Lands
          </button>
        </div>

        {activeTab === 'listings' && (
          <div className="listings-section">
            <div className="listings-header">
              <h2>My Listings</h2>
              <button className="new-listing-btn">+ New Listing</button>
            </div>
            <div className="listings-grid">
              {userListings.map(listing => (
                <div key={listing.id} className="listing-card">
                  <h3>{listing.title}</h3>
                  <p className="location">{listing.location}</p>
                  <div className="listing-stats">
                    <span>Views: {listing.views}</span>
                    <span>Inquiries: {listing.inquiries}</span>
                  </div>
                  <span className={`status ${listing.status}`}>{listing.status}</span>
                  <div className="listing-actions">
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leases' && (
          <div className="lease-history">
            <h2>Lease History</h2>
            <div className="lease-grid">
              {leaseHistory.map(lease => (
                <div key={lease.id} className="lease-card">
                  <h3>{lease.landTitle}</h3>
                  <p>Owner: {lease.owner}</p>
                  <p>Start Date: {lease.startDate}</p>
                  <p>End Date: {lease.endDate}</p>
                  <span className={`status ${lease.status}`}>{lease.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;