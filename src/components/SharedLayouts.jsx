import React from 'react';
import { Link } from 'react-router-dom';

const SharedLayouts = ({ title, lastUpdated, children }) => {
  return (
    <div style={styles.pageBackground}>
      <div style={styles.documentContainer}>
        
        {/* Navigation Bar */}
        <nav style={styles.navBar}>
          <Link to="/" style={styles.backButton}>
            &larr; Back to Home
          </Link>
          <span style={styles.brand}>AlgoStreak</span>
        </nav>

        {/* Document Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>{title}</h1>
          {lastUpdated && <p style={styles.date}>Last Updated: {lastUpdated}</p>}
        </header>

        {/* The Legal Text Goes Here */}
        <main style={styles.content}>
          {children}
        </main>

      </div>
    </div>
  );
};

const styles = {
  pageBackground: {
    minHeight: '100vh',
    backgroundColor: '#F3F4F6',
    padding: '40px 20px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  documentContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 30px',
    backgroundColor: '#FAFAFA',
    borderBottom: '1px solid #E5E7EB'
  },
  backButton: {
    textDecoration: 'none',
    color: '#4B5563',
    fontWeight: '500',
    fontSize: '14px'
  },
  brand: {
    fontWeight: 'bold',
    color: '#111827',
    fontSize: '16px'
  },
  header: {
    padding: '40px 40px 20px 40px',
    borderBottom: '1px solid #F3F4F6'
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '32px',
    color: '#111827'
  },
  date: {
    margin: 0,
    color: '#6B7280',
    fontSize: '14px'
  },
  content: {
    padding: '40px',
    lineHeight: '1.7',
    color: '#374151',
    fontSize: '16px'
  }
};

export default SharedLayouts;