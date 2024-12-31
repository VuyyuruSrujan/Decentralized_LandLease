import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEdit, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import '../styles/Profile.css';
import { LandLease_backend } from 'declarations/LandLease_backend';
import { Principal } from '@dfinity/principal';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    var navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [userDetails , setuserDetails] = useState([])
  const [userListings , setuserListings] = useState([]);

  useEffect(() =>{
    GetUserDetails();
    Get_My_Posts();
  },[])

  async function Get_My_Posts() {
    const principalId = localStorage.getItem("uniqueid");
    try {
        const answer = await LandLease_backend.Get_My_All_Post(Principal.fromText(principalId));
        console.log("answer:get my posts", answer);
        
        if (answer.length === 0) {
            setuserListings(["You haven't posted anything"]);
        } else {
            setuserListings(answer);
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}
  async function GetUserDetails(){
    try {
        var principall = localStorage.getItem("uniqueid");
        console.log(principall)
        if(principall != null || principall != ""){
        var answer = await LandLease_backend.GetUserDetailsByPrincipal(Principal.fromText(principall));
        console.log("answer",answer)
        setuserDetails(answer);
        }else{
            console.log("connect to internet identity");
            alert("connect to internet identity");
        }
    } catch (error) {
        console.log("error",error);
    }
  };

  async function SubmitUserReg(){
    event.preventDefault();
    var principal = localStorage.getItem("uniqueid");
    if(principal!=null || principal!=""){
        var Name = document.getElementById('usrname').value;
        var phno = BigInt(document.getElementById("userphno").value);
        var mail = document.getElementById("email").value;
        var loc = document.getElementById("usrLocation").value;
        var Age = BigInt(document.getElementById("usrAge").value);
        var UserRegister = {
            prin:(Principal.fromText(principal)),
            Name:Name,
            PhoneNumber:phno,
            Email:mail,
            Location:loc,
            Age:Age,
        };
        console.log("UserRegister",UserRegister);
        var result = await LandLease_backend.RegisterUser(UserRegister);
        console.log(result);
        if(result == "OK"){
            console.log("successfully registered");
            alert("successfully registered");
            navigate('/');
        }
    }else{
        console.log("connect to internet identity")
        alert("connect to internett identity");
    };
  };

  function PostingFun(){
    navigate('/post')
  }
  
  
//   const userListings = [
//     {
//       id: 1,
//       title: "Agricultural Land",
//       location: "Karnataka",
//       status: "active",
//       views: 245,
//       inquiries: 12
//     },
//     {
//       id: 2,
//       title: "Commercial Plot",
//       location: "Maharashtra",
//       status: "leased",
//       views: 189,
//       inquiries: 8
//     }
//   ];

//   const leaseHistory = [
//     {
//       id: 1,
//       landTitle: "Farm Land",
//       owner: "John Doe",
//       startDate: "2023-01-15",
//       endDate: "2025-01-15",
//       status: "active"
//     }
//   ];

  return (
    
    <motion.div 
      className="profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
         {userDetails.length === 0 ? (
        <>
            <form className="user-details-form" onSubmit={SubmitUserReg} >
                <h2>Complete Your Profile</h2>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" id='usrname' required />
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" name="location" id="usrLocation" required />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="Number" name="phone" id="userphno" required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" id="email"  required />
                </div>
                <div>
                    <label>Age:</label>
                    <input type="Number" name="age" id="usrAge"  required />
                </div><br />
                <button type="submit">Submit</button>
            </form>
        </>
      ) : (
        <>
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            <FaUser />
          </div>
          <div className="profile-details">
            <h1>{userDetails[0].Name}</h1>
            <div className="profile-meta">
              <span><FaMapMarkerAlt />{userDetails[0].Location}</span>
              <span><FaPhone /> {Number(userDetails[0].PhoneNumber)}</span>
              <span><FaEnvelope /> {userDetails[0].Email}</span>
              <span id="prinid" style={{ display: "block",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis",maxWidth: "200px" }} >
                <b>Principal:</b> {(userDetails[0].prin).toText()}
              </span>
            </div>
          </div>
          <button className="edit-profile-btn">
            <FaEdit /> Disconnect
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
              <button className="new-listing-btn" onClick={PostingFun}>+ New Listing</button>
            </div>
            <div className="listings-grid">
              {userListings.map(listing => (
                <div key={listing.id} className="listing-card">
                  <h3>{listing.title}</h3>
                  <p className="location"><FaMapMarkerAlt />{listing.location}</p>
                  <div className="listing-stats">
                    <span><b> Area: </b> {Number(listing.area)} acers </span>
                    <span>|</span>
                    <span><b>max lease years:</b> {Number(listing.lease_years)} years</span>
                  </div>
                  <span className='location'><b>Price per year:</b>{Number(listing.price_per_year)}</span>
                  {/* <span className='location'><b>Owner:</b>{(listing.prin).toText()}</span> */}
                  {/* <span className='location'><b>Description:</b>{(listing.description)}</span> */}
                  <span><b>Description:</b><textarea type="text" value={(listing.description)} readOnly/></span>
                  <div className="listing-actions">
                    <button>Edit</button>
                    <button>Save</button>
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
      </>
      )}
    </motion.div>
  );
};

export default Profile;
