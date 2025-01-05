import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/OwnerProfile.css';
import { LandLease_backend } from 'declarations/LandLease_backend';
import { Principal } from '@dfinity/principal';

const OwnerProfile = () => {
  const location = useLocation();
  const principalId = location.state?.principalId;
  const [ownerDetails , setownerDetails] = useState([]);

React.useEffect(() => {
    try {
        console.log("principal:",principalId);
    } catch (error) {
        console.log("error",error);
    }
    OwnerDetails();
    if (!principalId) {
      console.log("Principal ID:");
    } else {
      console.error("No Principal ID received.");
    }

  }, [principalId]);

//   async function SendRequestFun(){
//     var storereq = await 
//   };

  async function OwnerDetails(){
    try {
        var answer = await LandLease_backend.GetUserDetailsByPrincipal(Principal.fromText(principalId));
        console.log("owner details:",answer);
        if(answer){
            console.log("answer",answer);
            setownerDetails(answer);
        }
    } catch (error) {
        console.log("error",error);
    };
  };

  return (
  <>
    <div className="owner-profile">
      <h2>Owner's Profile</h2>
      {ownerDetails[0] ? (
        <>
          <p>Name: {ownerDetails[0].Name}</p>
          <p>
              Email:{' '}
              <a href={`mailto:${ownerDetails[0].Email}`}>
                {ownerDetails[0].Email}
              </a>
            </p>
            <p>Phone: {Number(ownerDetails[0].PhoneNumber)}</p>
          <p>Location: {ownerDetails[0].Location}</p>
          <p>Other Details: {ownerDetails[0].prin?.toText()}</p>
        </>
      ) : (
        <p>Loading owner details...</p>
      )}
    </div>
    <div>
      <center>
        <button>Send Request</button>
        <a href={`mailto:${ownerDetails[0].Email}`}><button>Connect Through Mail</button></a>
      </center>
    </div>
  </>
);

};

export default OwnerProfile
