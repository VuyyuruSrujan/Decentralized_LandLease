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
  const[saved_data , setsaved_data] = useState([]);
  const [landDetails, setLandDetails] = useState([]);

  useEffect(() =>{
    GetUserDetails();
    Get_My_Posts();
    saved_ids();
    saved_Lands();
    console.log("saved is's from saved data const:",saved_data);
    console.log("land details finally:",landDetails);
  },[landDetails])

  async function saved_Lands() {
    // Ensure `saved_data` is fully updated before using it
    if (saved_data.length === 0) {
      console.log("No saved data to process yet.");
      return;
    }

    try {
      const lands = await Promise.all(
        saved_data.map(async (id) => {
          const land = await LandLease_backend.get_posts_by_id(id);
          // console.log("land:",land); // Return the result for each id
        })
      );
      setLandDetails(lands); // Store all fetched data in state
      console.log("Fetched land details:", lands);
    } catch (error) {
      console.error("Error fetching land details:", error);
    };
  };

  async function saved_ids() {
    try {
      const principalId = localStorage.getItem("uniqueid");
      const ids = await LandLease_backend.getAllIds(Principal.fromText(principalId));
      console.log("Saved data:", ids);

      // Extract post IDs
      const postIds = ids.map((item) => item.post_id);
      console.log("Saved IDs:", postIds);

      // Update the state
      setsaved_data((prevData) => [...prevData, ...postIds]);

      // Trigger fetching of land details after IDs are updated
      setTimeout(saved_Lands, 0); // Ensures saved_data has been updated
    } catch (error) {
      console.error("Error fetching saved IDs:", error);
    }
  }

  async function Get_My_Posts() {
    const principalId = localStorage.getItem("uniqueid");
    try {
        const answer = await LandLease_backend.Get_My_All_Post(Principal.fromText(principalId));
        console.log("answer:get my posts", answer);
        setuserListings(answer);
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

  // async function SubmitUserReg(){
  //   event.preventDefault();
  //   var principal = localStorage.getItem("uniqueid");
  //   if(principal!= null || principal!= ""){
  //       var Name = document.getElementById('usrname').value;
  //       var phno = BigInt(document.getElementById("userphno").value);
  //       var mail = document.getElementById("email").value;
  //       var loc = document.getElementById("usrLocation").value;
  //       var Age = BigInt(document.getElementById("usrAge").value);
  //       var UserRegister = {
  //           prin:(Principal.fromText(principal)),
  //           Name:Name,
  //           PhoneNumber:phno,
  //           Email:mail,
  //           Location:loc,
  //           Age:Age,
  //       };
  //       console.log("UserRegister",UserRegister);
  //       var result = await LandLease_backend.RegisterUser(UserRegister);
  //       console.log(result);
  //       if(result == "OK"){
  //           console.log("successfully registered");
  //           alert("successfully registered");
  //           navigate('/');
  //       }
  //   }else if(principal == null || principal == " "){
  //       console.log("connect to internet identity")
  //       alert("connect to internett identity");
  //   };
  // };

  async function SubmitUserReg() {
    event.preventDefault();
    var principal = localStorage.getItem("uniqueid");
    if (principal !== null && principal !== "") {
        try {
            var Name = document.getElementById('usrname').value;
            var phno = BigInt(document.getElementById("userphno").value);
            var mail = document.getElementById("email").value;
            var loc = document.getElementById("usrLocation").value;
            var Age = BigInt(document.getElementById("usrAge").value);
            var UserRegister = {
                prin: Principal.fromText(principal),
                Name: Name,
                PhoneNumber: phno,
                Email: mail,
                Location: loc,
                Age: Age,
            };
            console.log("UserRegister", UserRegister);
            var result = await LandLease_backend.RegisterUser(UserRegister);
            console.log(result);
            if (result === "OK") {
                console.log("Successfully registered");
                alert("Successfully registered");
                navigate('/');
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed. Please try again.");
        }
    } else {
        console.log("Connect to Internet Identity");
        alert("Connect to Internet Identity");
    }
}


  function PostingFun(){
    navigate('/post')
  }

  async function SaveLand(post_id) {
    event.preventDefault();
    try {
      console.log("passed post id",BigInt(post_id));
        var principal = localStorage.getItem("uniqueid");
        var Post_ids = {
            prin: Principal.fromText(principal),
            post_id: BigInt(post_id), // Use the passed post_id
        };
        console.log("Post_id's, before pushing", Post_ids);
        if (principal != null && principal !== "") {
            var answer = await LandLease_backend.saved_Posts(Post_ids);
            console.log("saved", answer);
            if (answer === "OK") {
                alert("Saved successfully!");
            }
        } else {
            alert("Connect to internet identity");
        }
    } catch (error) {
        console.log("error", error);
    }
}



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
            Requests
          </button>
        </div>

        {activeTab === 'listings' && (
          <div className="listings-section">
            <div className="listings-header">
              <h2>My Listings</h2>
              <button className="new-listing-btn" onClick={PostingFun}>+ New Listing</button>
            </div>
            <div className="listings-grid"> 
              {userListings.length === 0 ?(
                <>
                  <center><h3>No land posts</h3></center>
                </>
              ) : (
                <>
                  {userListings.map(listing => (
                <div key={listing.id} className="listing-card">
                  <h3>{listing.title}</h3>
                  <p className="location"><FaMapMarkerAlt />{listing.location}</p>
                  <div className="listing-stats">
                    <span><b> Area: </b> {Number(listing.area)}acers </span>
                    {/* <span>|</span> */}
                    <span><b>max lease years:</b> {Number(listing.lease_years)} years</span>
                  </div>
                  <span className='location'><b>Price per year:</b>{Number(listing.price_per_year)}</span>
                  <span className='location'><b>Owner:</b>{(listing.prin).toText()}</span>
                  <span><b>Description:</b><textarea type="text" value={(listing.description)} readOnly/></span>
                  <div className="listing-actions">
                    {/* <button>Edit</button> */}
                    <button onClick={() => SaveLand(listing.postid)}>Save</button>
                  </div>
                </div>
              ))}
                </>
              ) }
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

        {/* {activeTab === 'saved' && (
          <div className="lease-history">
            <h2>Saved Land</h2>
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
        )} */}
      </div>
      </>
      )}


    </motion.div>
  );
};

export default Profile;
