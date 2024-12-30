import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';
import LandCard from '../components/LandCard';
import '../styles/Search.css';

const Search = () => {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    leaseTerm: ''
  });

  const dummyLands = [
    {
      id: 1,
      title: "Fertile Agricultural Land",
      location: "Karnataka, India",
      area: 5,
      leaseTerm: 10,
      price: 50000,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      description: "Fertile agricultural land with water source and good soil quality."
    },
    {
      id: 2,
      title: "Commercial Plot",
      location: "Maharashtra, India",
      area: 2,
      leaseTerm: 15,
      price: 75000,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      description: "Prime location commercial plot suitable for business."
    },
    {
      id: 3,
      title: "Agricultural Land with Irrigation",
      location: "Punjab, India",
      area: 8,
      leaseTerm: 12,
      price: 65000,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      description: "Well-irrigated agricultural land perfect for farming."
    }
  ];

  return (
    <motion.div 
      className="search-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="search-header">
        <h1>Find Your Perfect Land</h1>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by location, type, or keywords..."
            className="search-input"
          />
        </div>
      </div>

      <div className="search-content">
        <div className="filters-section">
          <div className="filters-header">
            <FaFilter />
            <h2>Filters</h2>
          </div>
          <div className="filter-group">
            <label>Location</label>
            <input 
              type="text" 
              placeholder="Enter location"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            />
          </div>
          <div className="filter-group">
            <label>Price Range (₹/year)</label>
            <div className="range-inputs">
              <input 
                type="number" 
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              />
              <input 
                type="number" 
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              />
            </div>
          </div>
          <div className="filter-group">
            <label>Area (acres)</label>
            <div className="range-inputs">
              <input 
                type="number" 
                placeholder="Min"
                value={filters.minArea}
                onChange={(e) => setFilters({...filters, minArea: e.target.value})}
              />
              <input 
                type="number" 
                placeholder="Max"
                value={filters.maxArea}
                onChange={(e) => setFilters({...filters, maxArea: e.target.value})}
              />
            </div>
          </div>
          <div className="filter-group">
            <label>Lease Term (years)</label>
            <select 
              value={filters.leaseTerm}
              onChange={(e) => setFilters({...filters, leaseTerm: e.target.value})}
            >
              <option value="">Any</option>
              <option value="1-5">1-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
          <button className="apply-filters">Apply Filters</button>
        </div>

        <div className="search-results">
          <div className="results-header">
            <h3>Search Results</h3>
            <select className="sort-select">
              <option value="relevance">Sort by Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="area">Area</option>
            </select>
          </div>
          <div className="results-grid">
            {dummyLands.map(land => (
              <LandCard key={land.id} land={land} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Search;