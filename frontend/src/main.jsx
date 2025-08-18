
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import HowToPlay from './pages/HowToPlay.jsx';
import Profile from './pages/Profile.jsx';
import AboutUs from './pages/AboutUs.jsx'; // Import AboutUs component
import ContactUs from './pages/ContactUs.jsx'; // Import ContactUs component
import Settings from './pages/Settings.jsx'; // Import Settings component
import { AuthProvider } from './context/AuthContext';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/how-to-play', element: <HowToPlay /> },
      { path: '/profile/:username', element: <Profile /> },
      { path: '/about-us', element: <AboutUs /> },
      { path: '/contact-us', element: <ContactUs /> },
      { path: '/settings', element: <Settings /> }, // Add Settings route
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
