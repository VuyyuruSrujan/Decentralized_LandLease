import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import '../styles/LandCard.css';

const LandCard = ({ land }) => {
  return (
    <motion.div 
      className="land-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img src={land.image} alt={land.title} className="land-image" />
      <div className="land-info">
        <h3>{land.title}</h3>
        <p className="location">{land.location}</p>
        <div className="details">
          <span>Area: {land.area} acres</span>
          <span>Lease Term: {land.leaseTerm} years</span>
          <span>Price: ₹{land.price}/year</span>
        </div>
        <p className="description">{land.description}</p>
        <button className="contact-btn">Contact Owner</button>
      </div>
    </motion.div>
  );
};

export default LandCard;