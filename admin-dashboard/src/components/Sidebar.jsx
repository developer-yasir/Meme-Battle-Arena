import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { admin, logout } = useContext(AuthContext);

  const menuItems = [
    { text: 'Dashboard', path: '/' },
    { text: 'Users', path: '/users' },
    { text: 'Memes', path: '/memes' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin</h2>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.text}>
            <Link to={item.path}>{item.text}</Link>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        {admin ? (
          <button onClick={logout}>
            Logout ({admin.username})
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;