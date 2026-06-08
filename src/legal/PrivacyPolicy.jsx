import React from 'react';
import SharedLayouts from '../components/SharedLayouts';

const PrivacyPolicy = () => {
  return (
    <SharedLayouts title="Privacy Policy" lastUpdated="October 2023">
      
      <h2>1. Information We Collect</h2>
      <p>
        AlgoStreak is committed to your privacy. We use Google Firebase Authentication to manage secure access. 
        The only personal information we collect and store is the email address and unique User ID (UID) provided by Google.
      </p>

      <h2>2. How We Use Your Data</h2>
      <p>
        Your data is used exclusively to maintain your daily streak progress and save your completion status for the 
        Data Structures and Algorithms (DSA) question sets. We do not sell, rent, or share your personal data with any third-party advertisers.
      </p>

      <h2>3. Data Storage and Security</h2>
      <p>
        Your streak and profile data are stored securely on Google Cloud Firestore servers. We implement standard security 
        protocols and Firestore Rules to ensure that your data can only be accessed by your authenticated account.
      </p>

      <h2>4. Your Rights</h2>
      <p>
        You have the right to request the deletion of your account and associated streak data at any time. To request data deletion, 
        please contact the developer through the support channels provided in the app or via the developer's portfolio.
      </p>

    </SharedLayouts>
  );
};

export default PrivacyPolicy;