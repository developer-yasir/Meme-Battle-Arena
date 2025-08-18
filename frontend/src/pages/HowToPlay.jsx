import React from 'react';
import './HowToPlay.css'; // Assuming you'll create a CSS file for this page

const HowToPlay = () => {
  return (
    <div className="how-to-play-page container">
      <h1>How to Play Meme Battle Arena</h1>
      <div className="card">
        <h2>1. Set Your Username</h2>
        <p>Before you can create or vote on memes, you'll need to set a unique username. This helps us track your contributions and votes!</p>
      </div>

      <div className="card">
        <h2>2. Create a Meme</h2>
        <p>Head over to the "Create Meme" section on the Home page. Type in your funniest or most relatable text. Remember, creativity is key!</p>
      </div>

      <div className="card">
        <h2>3. Vote on Memes</h2>
        <p>Browse through the "Live Meme Board" to see memes created by other users. If a meme makes you laugh or you agree with it, click the "Vote" button to show your support. You can only vote once per meme!</p>
      </div>

      <div className="card">
        <h2>4. Become the Meme King!</h2>
        <p>The meme with the most votes by the end of the day will be crowned the "Meme King of the Day"! Keep an eye on the leaderboard to see who's leading.</p>
      </div>

      <div className="card">
        <h2>Tips for Success:</h2>
        <ul>
          <li>Keep your memes concise and impactful.</li>
          <li>Share the game with friends to get more votes!</li>
          <li>Check back frequently for new memes to vote on.</li>
        </ul>
      </div>
    </div>
  );
};

export default HowToPlay;