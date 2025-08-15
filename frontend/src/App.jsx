import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import UsernamePrompt from './components/UsernamePrompt';
import AuthContext from './context/AuthContext';
import './App.css';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {!user && <UsernamePrompt />}
    </div>
  );
}

export default App;