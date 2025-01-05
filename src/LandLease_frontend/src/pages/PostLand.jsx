import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import '../styles/PostLand.css';
import { Principal } from '@dfinity/principal';
import { LandLease_backend } from 'declarations/LandLease_backend';
import { useNavigate } from 'react-router-dom';

const PostLand = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', location: '', area: '', leaseTerm: '', price: '', description: '',postid:Number('')});
  const [isReg , setisReg] = useState(false);

  useEffect(() =>{
    checkReg();
  },[])

  async function checkReg(){
    var principall = localStorage.getItem("uniqueid");
    var validation = await LandLease_backend.GetUserName(Principal.fromText(principall));
    if(validation == "null"){
        console.log("complete profile first");
    }else{
        setisReg(true);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isReg == true) {
        try {
            var principall = localStorage.getItem("uniqueid");
            if(principall){
            var Post = {
                prin:(Principal.fromText(localStorage.getItem("uniqueid"))),
                title:formData.title,
                location:formData.location,
                area:BigInt(formData.area),
                lease_years:BigInt(formData.leaseTerm),
                price_per_year:BigInt(formData.price),
                description:formData.description,
                postid: await LandLease_backend.get_posts_number(),
              };
              console.log("POST",Post);
              try {
                var pushing = await LandLease_backend.New_Post(Post);
                console.log("pushing",pushing)
                if(pushing == "OK"){
                toast.success('Land posted successfully!');
                console.log("formData",formData);
              }
              } catch (error) {
                console.log("error",error);
              };
              
            }else{
                console.log("connect to internet identity");
                alert("connect to internet identity");
            }
        } catch (error) {
            console.log("error",error)
        }
    } else {
        alert("complete profile first");
        navigate('/profile')
    }
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
              onWheel={(e) => e.target.blur()}
              onChange={(e) => setFormData({...formData, area: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Lease Term (years)</label>
            <input 
              type="number" 
              value={formData.leaseTerm}
              onWheel={(e) => e.target.blur()}
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
            onWheel={(e) => e.target.blur()}
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
        <button type="submit" className="submit-btn">Post Land</button>
      </form>
    </motion.div>
  );
};

export default PostLand;