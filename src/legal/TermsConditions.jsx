import React from 'react';
import SharedLayouts from '../components/SharedLayouts';

const TermsConditions = () => {
  return (
    <SharedLayouts title="Terms of Service" lastUpdated="October 2023">
      
      <h2>1. Acceptance of Terms</h2>
      <p>
        By downloading, accessing, or using the AlgoStreak application, you agree to be bound by these Terms of Service. 
        If you do not agree to these terms, please do not use the application.
      </p>

      <h2>2. Educational Purpose</h2>
      <p>
        AlgoStreak is provided as an educational tool to assist developers in maintaining consistency with their coding practice. 
        The curated lists of questions and links are provided for convenience and rely on third-party platforms (such as LeetCode or GeeksforGeeks). 
        We are not affiliated with these third-party platforms.
      </p>

      <h2>3. Acceptable Use</h2>
      <p>
        You agree to use AlgoStreak only for its intended purpose. You may not attempt to reverse engineer the app, bypass 
        authentication systems, or submit malicious data to the app's databases. The developer reserves the right to suspend 
        or terminate accounts that violate these terms.
      </p>

      <h2>4. Changes to the App</h2>
      <p>
        We reserve the right to modify, update, or discontinue the AlgoStreak application (or any part of it) at any time 
        without prior notice.
      </p>

    </SharedLayouts>
  );
};

export default TermsConditions;