'use client';

import { useState, useEffect  } from "react"; 
import { api } from '../services/api';

export default function Navbar() {
    const[isOnline, setIsOnline] = useState(false);
    const[theme, setTheme] = useState('light');

    useEffect(() => {
        const checkServer = async () => {
        const active = await api.checkHealth();
        setIsOnline(active);
        
    };

    checkServer();
    const timer = setInterval(checkServer, 10000);
    return() => clearInterval(timer);
}, []);

useEffect( () => {
    document.documentElement.setAttribute('data-theme', theme);

}, [theme]);

const handleToggleTheme = () => {
    setTheme(theme === "light"  ?
        "dark" : "light");
};

return (
    <header className="navbar">
        <div className="navbar-content">
      
        <div className="brand">
          <span className="brand-badge">LP</span>
          <span>LinkPulse</span>
        </div>

        <div className="nav-actions">
          
          <div className="status-pill" title="Backend Server Status">
            <span className={`status-dot ${isOnline ? 'active' : ''}`} />
            <span>{isOnline ? 'API Connected' : 'API Offline'}</span>
          </div>

    
          <button
            onClick={handleToggleTheme}
            className="btn-icon"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
       
);
}