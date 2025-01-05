// import React from 'react';
// import { motion } from 'framer-motion';
// import { format } from 'date-fns';
// import '../styles/LandCard.css';
// import { useNavigate } from 'react-router-dom';

// const LandCard = ({ land }) => {
//   const navigate = useNavigate();

//   function ContactOwnerFun(){
//     navigate('/owner');
//   };
//   return (
//     <motion.div 
//       className="land-card"
//       whileHover={{ scale: 1.05 }}
//       transition={{ duration: 0.3 }}
//     >
//       <img src="land.jpeg" alt={land.title} className="land-image" />
//       <div className="land-info">
//         <h3><b>Title:</b>{land.title}</h3>
//         <p className="location"><b style={{color: "black"}}>Location:</b>{land.location}</p>
//         <div className="details">
//           <span>Area: {Number(land.area)} acres</span>
//           <span>Lease Term: {Number(land.lease_years)} years</span>
//           <span>Price: ₹{Number(land.price_per_year)}/year</span>
//         </div>
//         <p className="description"><b style={{color: "black"}}>Description:</b> {land.description}</p>
//         <p><b>Owner:</b>
//           {land.prin && typeof land.prin.toText === 'function' ? (
//             <p className="description">{land.prin.toText()}</p>
//           ) : (
//             <p>Connect to ic</p>
//           )}
//         </p>

//         <button className="contact-btn" onClick={ContactOwnerFun}>Contact Owner</button>
//       </div>
//     </motion.div>
//   );
// };

// export default LandCard;


import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/LandCard.css';

const LandCard = ({ land }) => {
  const navigate = useNavigate();

  function ContactOwnerFun() {
    if (land.prin) {
      navigate('/owner', { state: { principalId: land.prin.toText() } });
    } else {
      console.error("Principal ID is missing.");
    }
  }

  return (
    <motion.div
      className="land-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img src="land.jpeg" alt={land.title} className="land-image" />
      <div className="land-info">
        <h3><b>Title:</b> {land.title}</h3>
        <p className="location"><b style={{ color: "black" }}>Location:</b> {land.location}</p>
        <div className="details">
          <span>Area: {Number(land.area)} acres</span>
          <span>Lease Term: {Number(land.lease_years)} years</span>
          <span>Price: ₹{Number(land.price_per_year)}/year</span>
        </div>
        <p className="description"><b style={{ color: "black" }}>Description:</b> {land.description}</p>
        <p><b>Owner:</b>
          {land.prin && typeof land.prin.toText === 'function' ? (
            <span className="description">{land.prin.toText()}</span>
          ) : (
            <span>Connect to IC</span>
          )}
        </p>
        <button className="contact-btn" onClick={ContactOwnerFun}>Contact Owner</button>
      </div>
    </motion.div>
  );
};

export default LandCard;
