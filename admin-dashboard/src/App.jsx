import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;