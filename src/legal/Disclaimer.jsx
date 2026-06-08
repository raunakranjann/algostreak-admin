import React from 'react';
import SharedLayouts from '../components/SharedLayouts';

const Disclaimer = () => {
  return (
    <SharedLayouts title="Disclaimer" lastUpdated="October 2023">
      
      <h2>1. No Guarantee of Employment</h2>
      <p>
        AlgoStreak is a personal tracking and educational tool designed to help users practice Data Structures and Algorithms. 
        However, maintaining a high streak or completing the provided question sets does <strong>not</strong> guarantee success in technical 
        interviews, nor does it guarantee employment at any technology company.
      </p>

      <h2>2. "As Is" Basis</h2>
      <p>
        The application is provided strictly on an "as is" and "as available" basis. While we strive to keep the app bug-free 
        and secure, we make no warranties, expressed or implied, regarding the reliability, accuracy, or availability of the app.
      </p>

      <h2>3. External Links</h2>
      <p>
        AlgoStreak contains links to external websites for coding challenges. We do not control these external sites and are 
        not responsible for their content, changes in their URL structures, or their privacy practices.
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        Under no circumstances shall the developer of AlgoStreak be held liable for any direct, indirect, incidental, or 
        consequential damages resulting from the use or inability to use the application.
      </p>

    </SharedLayouts>
  );
};

export default Disclaimer;