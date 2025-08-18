import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us-page container">
      <h1>Contact Us</h1>
      <div className="card">
        <h2>Get in Touch!</h2>
        <p>We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.</p>
      </div>

      <div className="card">
        <h2>General Inquiries</h2>
        <p>For general questions about Meme Battle Arena, please email us at:</p>
        <p><strong>info@memebattlearena.com</strong></p>
      </div>

      <div className="card">
        <h2>Support</h2>
        <p>If you're experiencing any technical issues or need assistance with your account, our support team is here to help:</p>
        <p><strong>support@memebattlearena.com</strong></p>
      </div>

      <div className="card">
        <h2>Business Inquiries</h2>
        <p>For partnership opportunities or business-related matters, please contact:</p>
        <p><strong>business@memebattlearena.com</strong></p>
      </div>

      <div className="card">
        <h2>Social Media</h2>
        <p>Follow us on our social media channels to stay updated:</p>
        <ul>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Instagram</a></li>
        </ul>
      </div>

      <div className="card">
        <h2>Our Office</h2>
        <p>Meme Battle Arena Headquarters</p>
        <p>123 Meme Lane</p>
        <p>Humorville, HA 90210</p>
        <p>MemeLand</p>
      </div>
    </div>
  );
};

export default ContactUs;