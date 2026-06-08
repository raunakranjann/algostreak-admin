import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import PrivacyPolicy from './legal/PrivacyPolicy';
import TermsConditions from './legal/TermsConditions';
import Disclaimer from './legal/Disclaimer';
import Developer from './components/Developer';
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // MAXIMUM SECURITY: Only this exact email will be allowed into the Dashboard
  const ALLOWED_ADMINS = ['raunakranjann@gmail.com']; 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && ALLOWED_ADMINS.includes(currentUser.email)) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h3 style={{ color: '#5f6368', fontFamily: 'sans-serif' }}>Authenticating System...</h3>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage user={user} />} />
        
        {/* Protected Dashboard */}
        <Route 
          path="/admin" 
          element={user ? <AdminDashboard user={user} /> : <Navigate to="/" replace />} 
        />
        
        {/* Public Legal Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/developer" element={<Developer />} /> 

        {/* Fallback Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;