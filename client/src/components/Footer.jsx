import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#2980b9', color: '#fff', padding: '20px 0', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ flex: '1', margin: '10px' }}>
          <h4>About Us</h4>
          <p>
            We are a leading real estate company providing top-notch services to help you find your dream home.
          </p>
        </div>
        <div style={{ flex: '1', margin: '10px' }}>
          <h4>Contact Us</h4>
          <p><FontAwesomeIcon icon={faEnvelope} /> info@PropApp.com</p>
          <p><FontAwesomeIcon icon={faPhone} /> +1 234 567 890</p>
        </div>
        <div style={{ flex: '1', margin: '10px' }}>
          <h4>Follow Us</h4>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="https://facebook.com" style={{ color: '#fff', margin: '0 10px', fontSize: '24px', textDecoration: 'none' }}><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="https://twitter.com" style={{ color: '#fff', margin: '0 10px', fontSize: '24px', textDecoration: 'none' }}><FontAwesomeIcon icon={faXTwitter} /></a>
            <a href="https://instagram.com" style={{ color: '#fff', margin: '0 10px', fontSize: '24px', textDecoration: 'none' }}><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://linkedin.com" style={{ color: '#fff', margin: '0 10px', fontSize: '24px', textDecoration: 'none' }}><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '10px' }}>
        <p>&copy; 2024 PropApp App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
