import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import LandPage from './views/LandPage';
import HealthIssues from './views/HealthIssues';
import SuburbFinder from './views/SuburbFinder';
import siteName from './images/SitName.svg';
import SleepQuality from './views/SleepQuality';
import NoiseDetection from './views/SleepQuality/NoiseDetection';
import SleepPattern from './views/SleepQuality/SleepPattern';
import SelfAssess from './views/SleepQuality/SelfAssess';
import SexualReproductiveHealth from './views/SexualReproductiveHealth';
const SleepIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 4v16" />
    <path d="M2 8h18a2 2 0 0 1 2 2v10" />
    <path d="M2 17h20" />
    <path d="M6 8v9" />
  </svg>
);

const HeartIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  // Icon components
  const HomeIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );

  const HospitalIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 6v4" />
      <path d="M14 14h-4" />
      <path d="M14 18h-4" />
      <path d="M14 8h-4" />
      <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
      <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
    </svg>
  );

  const MapIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
    </svg>
  );

  const MenuItem = ({ to, icon: Icon, label }) => {
    const isActive = currentPath.startsWith(to);
    const handleClick = () => {
      if (to === '/sexual-reproductive-health') {
        navigate(to);
        if (window.resetSexualReproductiveHealth) {
          window.resetSexualReproductiveHealth();
        }
      } else {
        navigate(to);
      }
    };

    return (
      <div
        onClick={handleClick}
        className={`menu-item flex items-center mb-4 px-4 py-6 cursor-pointer  
          ${isActive ? 'menu-active' : 'text-white'}`}
      >
        {isActive && (
          <>
            <div className="menu-decoration menu-decoration-top"></div>
            <div className="menu-decoration menu-decoration-bottom"></div>
          </>
        )}
        <Icon className="w-5 h-5 mr-3" />
        {label}
      </div>
    );
  };

  return (
    <div className="App flex h-screen overflow-hidden">
      <aside className="w-64 bg-blue-900 text-white py-4 flex-shrink-0 overflow-y-auto fixed h-full">
        <div className="flex items-center justify-center h-20">
          <Link to="/land-page">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="h-12 w-12"
              width="80"
              height="80"
              style={{ aspectRatio: "50/50", objectFit: "cover" }}
            />
          </Link>
        </div>
        <div className="flex items-center justify-center h-10">
          <img
            src={siteName}
            alt="Site Name"
            className="mt-1"
          />
        </div>
        <nav className="mt-10 flex flex-col justify-around w-full">
          <MenuItem to="/land-page" icon={HomeIcon} label="Home" />
          <MenuItem to="/health-issues" icon={HospitalIcon} label="Health issues" />
          <MenuItem to="/suburb-finder" icon={MapIcon} label="Suburb Finder" />
          <MenuItem to="/sleep-quality" icon={SleepIcon} label="Sleep Quality" />
          <MenuItem to="/sexual-reproductive-health" icon={HeartIcon} label="Sexual&Reproductive" />
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto bg-[#F3F4F6] ml-64">
        <Routes>
          <Route path="/" element={<LandPage />} />
          <Route path="/land-page" element={<LandPage />} />
          <Route path="/health-issues" element={<HealthIssues />} />
          <Route path="/suburb-finder" element={<SuburbFinder />} />
          <Route path="/sleep-quality" element={<SleepQuality />} />
          <Route path="/sleep-quality/noise-detection" element={<NoiseDetection />} />
          <Route path="/sleep-quality/sleep-pattern" element={<SleepPattern />} />
          <Route path="/sleep-quality/self-assess" element={<SelfAssess />} />
          <Route path="/sexual-reproductive-health" element={<SexualReproductiveHealth />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
