import React from 'react';
import { motion } from 'framer-motion';
import LandCard from '../components/LandCard';
import '../styles/Home.css';
import Navbar from '../components/Navbar';
const dummyLandss = [
  {
    id: 1,
    title: "Fertile Agricultural Land",
    location: "Karnataka, India",
    area: 5,
    leaseTerm: 15,
    price: 50000,
    image: "./land.jpeg",
    description: "Fertile agricultural land with water source and good soil quality."
  },
  {
    id: 2,
    title: "Commercial Plot",
    location: "Maharashtra, India",
    area: 2,
    lease_years: 15,
    price_per_year: 75000,
    image: "./land.jpeg",
    description: "Prime location commercial plot suitable for business."
  }
];

const Home = () => {
  return (
    <div className="home">
      <motion.div 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>Find Your Perfect Land for Lease</h1>
        <p>Connect with landowners and secure the best deals</p>
      </motion.div>
      
      <section className="featured-lands">
        <h2>Featured Properties</h2>
        <div className="land-grid">
          {dummyLandss.map(land => (
            <LandCard key={land.id} land={land} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;