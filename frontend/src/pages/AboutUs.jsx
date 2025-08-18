import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-page container">
      <h1>About Meme Battle Arena</h1>
      <div className="card">
        <h2>Our Mission</h2>
        <p>At Meme Battle Arena, our mission is to bring joy and laughter to the world through the power of memes. We believe that a good meme can brighten anyone's day, and we've created a platform where creativity and humor can thrive.</p>
      </div>

      <div className="card">
        <h2>What We Do</h2>
        <p>We provide a fun and interactive space for meme enthusiasts to:</p>
        <ul>
          <li><strong>Create:</strong> Unleash your inner comedian and craft hilarious text-based memes.</li>
          <li><strong>Vote:</strong> Discover and vote for your favorite memes, helping them climb the leaderboard.</li>
          <li><strong>Compete:</strong> See who can create the most popular memes and be crowned the Meme King of the Day!</li>
        </ul>
      </div>

      <div className="card">
        <h2>Our Vision</h2>
        <p>We envision a community where humor is celebrated, and everyone has a chance to share their unique perspective through memes. We're constantly working to improve the platform and introduce new features that make your meme experience even better.</p>
      </div>

      <div className="card">
        <h2>Join the Battle!</h2>
        <p>Whether you're a seasoned meme lord or just looking for a good laugh, Meme Battle Arena is the place for you. Join our growing community and let the meme battles begin!</p>
      </div>
    </div>
  );
};

export default AboutUs;