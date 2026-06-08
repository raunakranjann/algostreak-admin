import React from 'react';

const Developer = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>About the Developer</h1>
        
        {/* Replace with your full name if you want */}
        <h2 style={styles.name}>Raunak Ranjan</h2> 
        
        <p style={styles.text}>
          Creator of AlgoStreak. Passionate about building tools that help developers master Data Structures and Algorithms through daily consistency.
        </p>

        {/* Replace the href with your actual GitHub Profile URL */}
        <a 
          href="https://github.com/raunakranjann" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={styles.githubBtn}
        >
          <svg height="24" viewBox="0 0 16 16" width="24" style={styles.icon}>
            <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
          View GitHub Profile
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f1f3f4', // Matches the dashboard background vibe
    fontFamily: 'system-ui, sans-serif',
    padding: '20px'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
    border: '1px solid #e0e0e0'
  },
  title: {
    margin: '0 0 10px 0',
    color: '#5f6368',
    fontSize: '16px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  name: {
    margin: '0 0 16px 0',
    color: '#202124',
    fontSize: '32px',
    fontWeight: '800'
  },
  text: {
    color: '#3c4043',
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '32px'
  },
  githubBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '14px 24px',
    backgroundColor: '#24292e', // Official GitHub Dark Color
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'opacity 0.2s ease',
  },
  icon: {
    fill: 'white'
  }
};

export default Developer;