import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import LandPage from './views/LandPage';
import HealthIssues from './views/HealthIssues';
import SuburbFinder from './views/SuburbFinder';
// import siteName from './images/SitName.svg';
import SleepQuality from './views/SleepQuality';
import NoiseDetection from './views/SleepQuality/NoiseDetection';
import SleepPattern from './views/SleepQuality/SleepPattern';
import SelfAssess from './views/SleepQuality/SelfAssess';
import SexualReproductiveHealth from './views/SexualReproductiveHealth';
// import AddictionPrevention from './views/Addiction&DrugAbuse';
import Yoga from './views/Yoga';
import FoodAllergies from './views/FoodAllergic';
import AddictionLandpage from './views/Addiction&DrugAbuse/AddictionLandpage';
import GameIndex from './views/Addiction&DrugAbuse/GameIndex';
import AssessLandpage from './views/Addiction&DrugAbuse/AssessLandpage';
import StressAssess from './views/Addiction&DrugAbuse/StressAssess';
import Breath from './views/Addiction&DrugAbuse/Breath';

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

const YogaIcon = (props) => (
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
    <circle cx="12" cy="4" r="2" />
    <path d="M12 6v3" />
    <path d="M8 10a4 4 0 0 1 8 0" />
    <path d="M16 19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v7Z" />
    <path d="M7 19v-5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v5" />
    <path d="M5 21h14" />
  </svg>
);

const BookIcon = (props) => (
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
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const MenuIcon = (props) => (
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
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const FoodAllergyIcon = (props) => (
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
    <path d="M11 21H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h5" />
    <path d="M16 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
    <path d="M8 11h.01" />
    <path d="M8 15h.01" />
    <path d="M12 15h.01" />
    <path d="M12 11h.01" />
    <path d="M16 11h.01" />
    <path d="M16 15h.01" />
    <path d="M12 7h.01" />
    <path d="M20 7h.01" />
    <path d="M4 7h.01" />
    <path d="M17 3l-5 9" />
  </svg>
);

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 768);  // 根据初始屏幕宽度设置菜单状态
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth <= 768;
      setIsSmallScreen(smallScreen);
      setIsMenuOpen(!smallScreen);  // 在大屏幕上打开菜单，小屏幕上关闭
    };

    // 在组件挂载和窗口大小变化时调用handleResize
    handleResize();
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => window.removeEventListener('resize', handleResize);
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
      if (isSmallScreen) {
        setIsMenuOpen(false);
      }
    };

    return (
      <div
        onClick={handleClick}
        className={`menu-item flex items-center mb-2 px-4 py-3 cursor-pointer rounded-lg transition-all duration-200 ease-in-out
          ${isActive ? 'menu-active bg-white text-blue-900' : 'text-white hover:bg-blue-800'} ${isSmallScreen ? 'small-screen-item' : ''}`}
      >
        <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-900' : 'text-white'}`} />
        <span className="font-medium">{label}</span>
      </div>
    );
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App flex h-screen overflow-hidden">
      <aside className={`sidebar ${isMenuOpen ? 'open' : 'closed'} bg-blue-900 text-white py-6 flex-shrink-0 overflow-y-auto fixed h-full ${isSmallScreen ? 'small-screen' : ''} shadow-lg transition-all duration-300`}>
        <div className="flex flex-col items-center justify-center px-4 mb-8 relative">
          <Link to="/land-page" className="logo-container">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="h-16 w-16 rounded-full shadow-md"
              width="80"
              height="80"
              style={{ aspectRatio: "1", objectFit: "cover" }}
            />
          </Link>
          <button onClick={toggleMenu} className="text-white close-button absolute top-0 right-0 mt-2 mr-2 p-1 rounded-full hover:bg-blue-800 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <nav className="flex flex-col justify-around w-full px-2">
          <MenuItem to="/land-page" icon={HomeIcon} label="Home" />
          <MenuItem to="/health-issues" icon={HospitalIcon} label="Health issues" />
          <MenuItem to="/suburb-finder" icon={MapIcon} label="Suburb Finder" />
          <MenuItem to="/sleep-quality" icon={SleepIcon} label="Sleep Quality" />
          <MenuItem to="/sexual-reproductive-health" icon={HeartIcon} label="Sexual & Reproductive" />
          <MenuItem to="/food-allergies" icon={FoodAllergyIcon} label="Food Allergies" />
          <MenuItem to="/yoga" icon={YogaIcon} label="Yoga & exercise" />
          <MenuItem to="/addiction-prevention" icon={BookIcon} label="Stress and Lifestyle" />
        </nav>
      </aside>
      {!isMenuOpen && (
        <button onClick={toggleMenu} className="fixed top-4 left-4 z-50 bg-blue-900 text-white p-2 rounded-full shadow-md hover:bg-blue-800 transition-colors duration-200">
          <MenuIcon className="w-6 h-6" />
        </button>
      )}
      <main className={`flex-1 overflow-y-auto bg-[#F3F4F6] transition-all duration-300 ${isMenuOpen && !isSmallScreen ? 'ml-64' : 'ml-0'}`}>
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
          <Route path="/addiction-prevention" element={<AddictionLandpage />} />
          <Route path="/addiction-prevention/game" element={<GameIndex />} />
          <Route path="/addiction-prevention/assess" element={<AssessLandpage />} />
          <Route path="/addiction-prevention/stress-assess" element={<StressAssess />} />
          <Route path="/yoga" element={<Yoga />} />
          <Route path="/food-allergies" element={<FoodAllergies />} />
          <Route path="/addiction-prevention/breath" element={<Breath />} />
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