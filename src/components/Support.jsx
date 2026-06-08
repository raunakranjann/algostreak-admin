

import React from 'react';

const Support = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>AlgoStreak Help & Support</h1>
        <p style={styles.text}>
          Need help with your account or have a question about the app? We are here to help you stay on track with your learning.
        </p>

        <div style={styles.contactBox}>
          <h2 style={styles.subTitle}>Contact the Developer</h2>
          <p style={styles.text}>For bug reports, feature requests, or account assistance, email us directly at:</p>
          {/* REPLACE WITH YOUR ACTUAL EMAIL */}
          <a href="mailto:raunakranjann@gmail.com" style={styles.emailLink}>
            raunakranjann@gmail.com
          </a>
        </div>

        <div style={styles.faqBox}>
          <h2 style={styles.subTitle}>Frequently Asked Questions</h2>
          
          <div style={styles.faqItem}>
            <h3 style={styles.faqQuestion}>How is my daily streak calculated?</h3>
            <p style={styles.faqAnswer}>
              Your streak increases automatically when you open the app on consecutive days. If you miss a full calendar day, your streak will reset to 1.
            </p>
          </div>

          <div style={styles.faqItem}>
            <h3 style={styles.faqQuestion}>If I lose my streak, do my questions lock again?</h3>
            <p style={styles.faqAnswer}>
              No! Your unlocked days and completed questions are permanent. Even if your streak breaks, you will never lose access to the content you have already unlocked.
            </p>
          </div>

          <div style={styles.faqItem}>
            <h3 style={styles.faqQuestion}>How do I permanently delete my account?</h3>
            <p style={styles.faqAnswer}>
              Open the AlgoStreak Android app, tap the side menu (hamburger icon), and select "Delete Account". Please note that this action cannot be undone and will erase all your progress.
            </p>
          </div>
        </div>
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
    backgroundColor: '#f1f3f4', // Matches your dashboard vibe
    fontFamily: 'system-ui, sans-serif',
    padding: '20px'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    maxWidth: '600px',
    width: '100%',
    border: '1px solid #e0e0e0'
  },
  title: {
    margin: '0 0 16px 0',
    color: '#202124',
    fontSize: '28px',
    fontWeight: '800',
    textAlign: 'center'
  },
  subTitle: {
    margin: '0 0 12px 0',
    color: '#202124',
    fontSize: '20px',
    fontWeight: '700'
  },
  text: {
    color: '#5f6368',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 20px 0',
    textAlign: 'center'
  },
  contactBox: {
    backgroundColor: '#e8f0fe', // Light Google Blue
    padding: '24px',
    borderRadius: '12px',
    textAlign: 'center',
    marginBottom: '32px'
  },
  emailLink: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#1a73e8',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'opacity 0.2s ease'
  },
  faqBox: {
    marginTop: '20px'
  },
  faqItem: {
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid #f1f3f4'
  },
  faqQuestion: {
    margin: '0 0 8px 0',
    color: '#202124',
    fontSize: '16px',
    fontWeight: '700'
  },
  faqAnswer: {
    margin: 0,
    color: '#5f6368',
    fontSize: '15px',
    lineHeight: '1.6'
  }
};

export default Support;