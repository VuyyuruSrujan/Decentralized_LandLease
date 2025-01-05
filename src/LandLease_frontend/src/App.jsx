// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Search from './pages/Search';
// import Profile from './pages/Profile';
// import PostLand from './pages/PostLand';
// import 'react-toastify/dist/ReactToastify.css';
// import './App.css';

// export default function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className="app">
//         <main>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/search" element={<Search />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/post" element={<PostLand />} />
//           </Routes>
//         </main>
//         <Footer />
//         <ToastContainer position="bottom-right" />
//       </div>
//     </Router>
//   );
// }


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import PostLand from './pages/PostLand';
import OwnerProfile from './pages/OwnerProfile';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post" element={<PostLand />} />
            <Route path="/owner" element={<OwnerProfile />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}
