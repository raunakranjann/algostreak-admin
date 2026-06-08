import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const LandingPage = ({ user }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    // If already logged in, just go straight to the dashboard
    if (user) {
      navigate('/admin');
      return;
    }

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      
      if (result.user) {
        // SECURITY CHECK: Replace this with your exact Gmail address
        const ALLOWED_ADMINS = ['raunakranjann@gmail.com']; 
        
        if (ALLOWED_ADMINS.includes(result.user.email)) {
          navigate('/admin');
        } else {
          alert("Access Denied: Unrecognized administrator email.");
          await signOut(auth); // Boot them out instantly
        }
      }
    } catch (error) {
      console.error("Authentication Error:", error);
      // Don't show an error if they just closed the popup manually
      if (error.code !== 'auth/popup-closed-by-user') {
        alert("Sign-in connection failed.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.brandingBox}>
        {/* Placeholder Logo */}
        <div style={styles.logoCircle}>🔥</div> 
        
        <h1 style={styles.appName}>AlgoStreak</h1>
        <p style={styles.versionTag}>Admin Console v1.0</p>
        
        <button onClick={handleLogin} style={styles.adminBtn}>
          {user ? "Enter Dashboard Console" : "Admin Login"}
        </button>
      </div>
      
      <footer style={styles.footerLinks}>
        <Link to="/privacy-policy" style={styles.link}>Privacy Policy</Link>
        <span style={styles.dot}>•</span>
        <Link to="/terms-conditions" style={styles.link}>Terms of Service</Link>
        <span style={styles.dot}>•</span>
        <Link to="/disclaimer" style={styles.link}>Disclaimer</Link>
      </footer>
    </div>
  );
};

// Clean minimalist styling
const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA', fontFamily: 'system-ui, sans-serif' },
  brandingBox: { textAlign: 'center', backgroundColor: '#FFFFFF', padding: '50px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', width: '100%', maxWidth: '350px' },
  logoCircle: { fontSize: '50px', width: '90px', height: '90px', borderRadius: '50%', backgroundColor: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' },
  appName: { fontSize: '32px', fontWeight: '800', margin: '0 0 5px 0', color: '#202124' },
  versionTag: { fontSize: '14px', color: '#70757a', margin: '0 0 35px 0', fontWeight: '500' },
  adminBtn: { width: '100%', padding: '14px', backgroundColor: '#202124', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' },
  footerLinks: { position: 'absolute', bottom: '30px', fontSize: '14px', color: '#5f6368' },
  link: { color: '#1a73e8', textDecoration: 'none', fontWeight: '500' },
  dot: { margin: '0 12px', color: '#dadce0' }
};

export default LandingPage;