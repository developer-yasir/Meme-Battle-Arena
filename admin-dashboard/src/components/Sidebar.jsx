import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Sidebar = () => {
  const { admin, logout } = useContext(AuthContext);

  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4 text-2xl font-bold">Admin</div>
      <nav>
        <ul>
          <li className="p-4 hover:bg-gray-700"><Link to="/">Dashboard</Link></li>
          <li className="p-4 hover:bg-gray-700"><Link to="/users">Users</Link></li>
          <li className="p-4 hover:bg-gray-700"><Link to="/memes">Memes</Link></li>
          {admin ? (
            <li className="p-4 hover:bg-gray-700">
              <button onClick={logout}>Logout ({admin.username})</button>
            </li>
          ) : (
            <li className="p-4 hover:bg-gray-700"><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;