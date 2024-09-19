import React from 'react';
import './LandPage.css';

function Privacy({ onBack }) {
  return (
    <div className="sub-page privacy-policy">
      <h2 className="page-title">Our Privacy Policy</h2>
      <p>At Link2HerResilience ("we," "our," or "us"), we are committed to protecting the privacy of our users ("you" or "your") and ensuring the security of any personal information you provide while using our website, [link2herresilience.com.au] (the "Site"). This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal data.</p>
      
      <h3 className="sub-title">1. Information We Collect</h3>
      <p>We collect various types of information to provide and improve our services. This includes:</p>
      <ul className="feature-list">
        <li><strong>Personal Information:</strong> Information that identifies you personally, such as your name, email address, location, and any other information you voluntarily provide through forms on our Site.</li>
        <li><strong>Health-Related Data:</strong> Non-identifiable health data may be collected based on your use of our health tools and resources. This includes data on health conditions, sleep patterns, and other well-being indicators, but it is not tied to your identity.</li>
        <li><strong>Usage Data:</strong> Information automatically collected when you use the Site, such as your IP address, browser type, operating system, and browsing behavior (e.g., pages viewed, time spent on each page).</li>
      </ul>

      <h3 className="sub-title">2. How We Use Your Information</h3>
      <p>We use the information we collect in the following ways:</p>
      <ul className="feature-list">
        <li><strong>To Provide Services:</strong> Personalize your experience and provide you with health information, tools, and resources relevant to your needs as a migrant woman in Australia.</li>
        <li><strong>To Improve Our Site:</strong> Analyze user behavior to enhance the performance and usability of our Site and develop new features.</li>
        <li><strong>To Communicate With You:</strong> Send updates, newsletters, or respond to inquiries when you contact us. You can opt out of communications at any time.</li>
        <li><strong>For Research and Analysis:</strong> Aggregate non-identifiable data for research and analysis purposes to improve public health outcomes for migrant women.</li>
      </ul>

      <h3 className="sub-title">3. Data Sharing and Disclosure</h3>
      <p>We are committed to keeping your personal information private. We do not sell, rent, or trade your personal information to third parties. However, we may share information in the following situations:</p>
      <ul className="feature-list">
        <li><strong>With Service Providers:</strong> We may share personal data with third-party service providers to assist in operating our Site or conducting business, as long as they agree to keep your information confidential.</li>
        <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid requests by public authorities.</li>
      </ul>

      <h3 className="sub-title">4. Data Security</h3>
      <p>We take the protection of your personal data seriously. We have implemented appropriate security measures to prevent unauthorized access, disclosure, alteration, or destruction of your personal information. However, please note that no method of transmission over the internet or method of electronic storage is 100% secure.</p>

      <h3 className="sub-title">5. Your Data Rights</h3>
      <p>You have certain rights regarding your personal data, including:</p>
      <ul className="feature-list">
        <li><strong>Access and Correction:</strong> You may request access to or correction of your personal data held by us.</li>
        <li><strong>Deletion:</strong> You have the right to request the deletion of your personal information in certain circumstances.</li>
        <li><strong>Opt-Out:</strong> You may opt out of receiving any marketing or promotional communications from us by following the unsubscribe link in any email or by contacting us directly.</li>
      </ul>

      <h3 className="sub-title">6. Third-Party Links</h3>
      <p>Our Site may contain links to third-party websites. We are not responsible for the privacy practices or the content of those third-party sites. We encourage you to review the privacy policies of any third-party websites you visit.</p>

      <h3 className="sub-title">7. Cookies and Tracking Technologies</h3>
      <p>We use cookies and similar tracking technologies to enhance your experience on our Site. Cookies help us understand user behaviour and provide personalized content. You can adjust your browser settings to refuse cookies, but this may affect your ability to use certain features of the Site.</p>

      <h3 className="sub-title">8. Changes to This Privacy Policy</h3>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your data.</p>

      <p className="closing">By using our Site, you agree to the terms of this Privacy Policy.</p>

      <button onClick={onBack} className="back-button">Back to Main Page</button>
    </div>
  );
}

export default Privacy;