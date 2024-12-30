import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaPlus, FaUser, FaBars } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">
          <img src="https://img.icons8.com/color/48/000000/land-sales.png" alt="LandLease" />
          <span>LandLease</span>
        </Link>
      </div>

      <button 
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <FaBars />
      </button>

      <div className="nav-links">
        <Link to="/" className="nav-link"><FaHome /> Home</Link>
        <Link to="/search" className="nav-link"><FaSearch /> Search</Link>
        <Link to="/post" className="nav-link"><FaPlus /> Post Land</Link>
        <Link to="/profile" className="nav-link"><FaUser /> Profile</Link>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link"><FaHome /> Home</Link>
        <Link to="/search" className="nav-link"><FaSearch /> Search</Link>
        <Link to="/post" className="nav-link"><FaPlus /> Post Land</Link>
        <Link to="/profile" className="nav-link"><FaUser /> Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;