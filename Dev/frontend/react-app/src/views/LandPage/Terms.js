import React from 'react';
import './LandPage.css';

function Terms({ onBack }) {
  return (
    <div className="sub-page terms-conditions">
      <h2 className="page-title">Terms and Conditions</h2>
      <p>Welcome to Link2HerResilience ("we," "our," or "us"). By accessing and using our website, [link2herresilience.com.au] (the "Site"), you agree to comply with and be bound by the following terms and conditions ("Terms"). Please read these Terms carefully before using the Site. If you do not agree to these Terms, you should not access or use the Site.</p>

      <h3 className="sub-title">1. Acceptance of Terms</h3>
      <p>By accessing, browsing, or using the Site, you confirm that you have read, understood, and agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you must not use the Site.</p>

      <h3 className="sub-title">2. Use of the Site</h3>
      <p>You agree to use the Site only for lawful purposes and in accordance with these Terms. You are prohibited from:</p>
      <ul className="feature-list">
        <li>Using the Site in any way that could damage, disable, overburden, or impair the Site's functionality.</li>
        <li>Attempting to gain unauthorized access to any part of the Site, other accounts, or any systems or networks connected to the Site.</li>
        <li>Engaging in any fraudulent, abusive, or harmful activity that may disrupt the experience of other users.</li>
      </ul>

      <h3 className="sub-title">3. Health-Related Information Disclaimer</h3>
      <p>The information provided on this Site is intended for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your doctor or other qualified health provider with any questions you may have regarding a medical condition.</p>
      <p>We strive to ensure that the content on the Site is accurate and up-to-date, but we make no guarantees regarding the completeness, accuracy, or timeliness of the information provided. You acknowledge that any reliance on such information is at your own risk.</p>

      <h3 className="sub-title">4. User Accounts and Responsibilities</h3>
      <p>To access certain features of the Site, you may be required to create an account and provide personal information. You agree to provide accurate, complete, and current information during registration and to update this information as necessary.</p>
      <p>You are responsible for maintaining the confidentiality of your account login credentials and for all activities that occur under your account. You agree to notify us immediately if you suspect any unauthorized use of your account or any breach of security.</p>

      <h3 className="sub-title">5. Intellectual Property</h3>
      <p>All content on the Site, including text, graphics, logos, images, videos, software, and other materials, is owned or licensed by Link2HerResilience and is protected by copyright, trademark, and other intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to access and use the Site and its content solely for personal, non-commercial use.</p>
      <p>You may not:</p>
      <ul className="feature-list">
        <li>Modify, distribute, reproduce, or create derivative works from any content on the Site without our prior written consent.</li>
        <li>Use any content from the Site for commercial purposes without explicit authorization.</li>
      </ul>

      <h3 className="sub-title">6. Third-Party Links</h3>
      <p>The Site may contain links to third-party websites for your convenience and information. These links do not imply endorsement or approval by Link2HerResilience of the linked websites or their content. We have no control over the content or practices of these third-party websites and assume no responsibility for them. We encourage you to review the terms and policies of any third-party websites you visit.</p>

      <h3 className="sub-title">7. Limitation of Liability</h3>
      <p>To the fullest extent permitted by law, Link2HerResilience shall not be liable for any direct, indirect, incidental, consequential, or punitive damages, including but not limited to, loss of data, loss of profits, or business interruption, arising from or in connection with your use of the Site or inability to use the Site, even if we have been advised of the possibility of such damages.</p>
      <p>You agree that your use of the Site is at your sole risk and that the Site is provided on an "as-is" and "as available" basis, without any warranties of any kind, either express or implied.</p>

      <h3 className="sub-title">8. Indemnification</h3>
      <p>You agree to indemnify, defend, and hold harmless Link2HerResilience, its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses, including reasonable attorneys' fees, arising out of or related to your use or misuse of the Site, your violation of these Terms, or your infringement of any rights of another person or entity.</p>

      <h3 className="sub-title">9. Modifications to the Site and Terms</h3>
      <p>We reserve the right to modify or discontinue the Site, its features, or any services offered at any time without notice. We also reserve the right to change these Terms at any time, and any changes will be effective immediately upon posting. Your continued use of the Site after any changes have been posted will constitute your acceptance of the revised Terms.</p>

      <h3 className="sub-title">10. Governing Law</h3>
      <p>These Terms and your use of the Site are governed by and construed in accordance with the laws of Australia, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located in [Insert Jurisdiction] for the resolution of any disputes arising out of or relating to these Terms or your use of the Site.</p>

      <h3 className="sub-title">11. Termination</h3>
      <p>We reserve the right to terminate or suspend your access to the Site, without notice, for any conduct that we believe violates these Terms or is harmful to us or other users. Upon termination, all provisions of these Terms that by their nature should survive will survive, including ownership provisions, warranty disclaimers, and limitations of liability.</p>

      <p className="closing">By using our Site, you agree to these Terms and Conditions.</p>

      <button onClick={onBack} className="back-button">Back to Main Page</button>
    </div>
  );
}

export default Terms;