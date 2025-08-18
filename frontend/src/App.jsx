import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import Footer
import UsernamePrompt from './components/UsernamePrompt';
import AuthContext from './context/AuthContext';
import './App.css';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="app-container"> {/* Add a container for flexbox positioning */}
      <Navbar />
      <main className="content-wrap">
        <Outlet />
      </main>
      {!user && <UsernamePrompt />}
      <Footer /> {/* Render Footer */}
    </div>
  );
}

export default App;