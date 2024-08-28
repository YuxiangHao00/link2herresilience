import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LandPage from './views/LandPage';
import HealthIssues from './views/HealthIssues';
import SuburbFinder from './views/SuburbFinder';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

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

  return (
    <Router>
      <div className="App">
        <div className="flex min-h-screen bg-gray-100">
          <aside className="w-64 bg-blue-900 text-white py-4">
            <div className="flex items-center justify-center h-20">
              <img
                src="/logo.jpg"
                alt="Logo"
                className="h-12 w-12"
                width="80"
                height="80"
                style={{ aspectRatio: "50/50", objectFit: "cover" }}
              />
            </div>
            <nav className="mt-10 flex flex-col justify-around w-full">
              <Link to="/land-page">
                <div 
                  onClick={() => setCurrentPath('/land-page')} 
                  className={`flex items-center mb-4 px-4 py-6 cursor-pointer transition-colors duration-200 
                    ${currentPath === '/land-page' 
                      ? 'bg-white text-blue-900 font-bold menu-active' 
                      : 'text-white hover:bg-blue-800'}`}
                >
                  <HomeIcon className="w-5 h-5 mr-3" />
                  Land page
                </div>
              </Link>
              <Link to="/health-issues">
                <div 
                  onClick={() => setCurrentPath('/health-issues')} 
                  className={`flex items-center mb-4 px-4 py-6 cursor-pointer transition-colors duration-200 
                    ${currentPath === '/health-issues' 
                      ? 'bg-white text-blue-900 font-bold menu-active' 
                      : 'text-white hover:bg-blue-800'}`}
                >
                  <HospitalIcon className="w-5 h-5 mr-3" />
                  Health issues
                </div>
              </Link>
              <Link to="/suburb-finder">
                <div 
                  onClick={() => setCurrentPath('/suburb-finder')} 
                  className={`flex items-center mb-4 px-4 py-6 cursor-pointer transition-colors duration-200 
                    ${currentPath === '/suburb-finder' 
                      ? 'bg-white text-blue-900 font-bold menu-active' 
                      : 'text-white hover:bg-blue-800'}`}
                >
                  <MapIcon className="w-5 h-5 mr-3" />
                  Suburb Finder
                </div>
              </Link>
            </nav>
          </aside>
          <main className="flex-1 p-10">
            <Routes>
              <Route path="/" element={<LandPage />} />
              <Route path="/land-page" element={<LandPage />} />
              <Route path="/health-issues" element={<HealthIssues />} />
              <Route path="/suburb-finder" element={<SuburbFinder />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;